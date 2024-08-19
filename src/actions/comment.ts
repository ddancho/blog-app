"use server";

import prisma from "@/lib/prismaClientDb";
import { CommentServerResponse, CreateCommentSchema } from "@/types/comment";
import { getErrorMessage } from "@/actions/util";
import { destroySession, getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { ServerResponse } from "@/types/server";
import { revalidatePath } from "next/cache";
import { getUserByEmail } from "@/actions/user";

export async function createComment(newComment: unknown) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  let response: ServerResponse;

  const checkUserEmail = await getUserByEmail(session.email);
  if (checkUserEmail.status === "error") {
    await destroySession();

    response = {
      status: "error",
      message: "Not Authorized",
    };

    return response;
  }

  const result = CreateCommentSchema.safeParse(newComment);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    response = {
      status: "error",
      message: errorMessage,
    };

    return response;
  }

  try {
    await prisma.comment.create({
      data: {
        description: result.data.description,
        userEmail: session.email!,
        postSlug: result.data.postSlug,
      },
    });

    revalidatePath(`/posts/${result.data.postSlug}`);

    const response: CommentServerResponse = {
      status: "success",
      message: "Comment is created",
    };

    return response;
  } catch (error: unknown) {
    const response: CommentServerResponse = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

export async function getCommentsByPostSlug(postSlug: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postSlug,
      },
      select: {
        createdAt: true,
        description: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const response: CommentServerResponse = {
      status: "success",
      message: "Comments successfully fetched",
      comments,
    };

    return response;
  } catch (error: unknown) {
    const response: CommentServerResponse = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

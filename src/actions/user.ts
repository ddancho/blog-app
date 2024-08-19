"use server";

import prisma from "@/lib/prismaClientDb";
import {
  UserCheckSchema,
  UserSignInSchema,
  UserSignUpSchema,
} from "@/types/user";
import { ServerResponse } from "@/types/server";
import { getErrorMessage } from "@/actions/util";
import bcrypt from "bcrypt";
import { getSession, createSession, destroySession } from "@/actions/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getUserByEmail(email: unknown) {
  const result = UserCheckSchema.safeParse({ email });
  let response: ServerResponse;

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
    await prisma.user.findUniqueOrThrow({
      where: {
        email: result.data.email,
      },
    });

    response = {
      status: "success",
      message: "Email is connected with user",
    };

    return response;
  } catch (error) {
    response = {
      status: "error",
      message: "Email is not accepted",
    };

    return response;
  }
}

export async function logoutUser() {
  await destroySession();

  return;
}

export async function loginUser(userData: unknown) {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/");
  }

  const result = UserSignInSchema.safeParse(userData);
  let response: ServerResponse;

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
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: result.data.email,
      },
    });

    const checkPasswords = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!checkPasswords) {
      throw new Error("No User found"); // same as prisma...
    }

    await createSession(user.name, user.email);

    revalidatePath("/login");

    response = {
      status: "success",
      message: "User is login",
    };

    return response;
  } catch (error: unknown) {
    response = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

export async function registerUser(newUser: unknown) {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/");
  }

  const result = UserSignUpSchema.safeParse(newUser);
  let response: ServerResponse;

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
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(result.data.password, salt);

    await prisma.user.create({
      data: {
        email: result.data.email,
        name: result.data.name,
        password: passwordHash,
      },
    });

    revalidatePath("/register");

    response = {
      status: "success",
      message: "User is created",
    };

    return response;
  } catch (error: unknown) {
    response = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

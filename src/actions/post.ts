"use server";

import prisma from "@/lib/prismaClientDb";
import {
  CreatePostSchema,
  FormDataImageSchema,
  PostServerResponse,
} from "@/types/post";
import {
  getErrorMessage,
  slugifyString,
  FORM_DATA_FILES,
  POSTS_PER_PAGE,
  UPLOAD_FOLDER_DIR,
  UPLOAD_FOLDER_DIR_PATH,
} from "@/actions/util";
import { getSession, destroySession } from "@/actions/session";
import { ServerResponse } from "@/types/server";
import { redirect } from "next/navigation";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import path from "path";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import uniqueSlug from "unique-slug";
import { getAllCategories } from "@/actions/category";
import { getUserByEmail } from "@/actions/user";
import { revalidatePath } from "next/cache";

export async function getLatestPost() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        slug: true,
        title: true,
        description: true,
        views: true,
        image: true,
        createdAt: true,
        category: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    const response: PostServerResponse = {
      status: "success",
      message: "Post successfully fetched",
      post: posts[0],
    };

    return response;
  } catch (error: unknown) {
    const response: PostServerResponse = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

export async function createPost(newPost: unknown, formData: FormData | null) {
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

  // validating post data first 'cos image is not mandatory
  const result = CreatePostSchema.safeParse(newPost);
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

  // validate category slug (TODO in zod)
  const { categories } = await getAllCategories();
  if (categories === undefined || categories.length === 0) {
    response = {
      status: "error",
      message: "Seed categories into database before creating first post",
    };

    return response;
  }
  if (
    !categories
      .map((category) => category.slug)
      .includes(result.data.categorySlug)
  ) {
    response = {
      status: "error",
      message: "Category slug is not valid",
    };

    return response;
  }

  let postImage: string | undefined = undefined;

  // is there an image for the post
  if (formData) {
    // validate formData as File
    const file = formData.getAll(FORM_DATA_FILES)[0];
    if (file instanceof File === false) {
      response = {
        status: "error",
        message: "File error. Try again later",
      };

      return response;
    }

    // validate file data
    const result = FormDataImageSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      response = {
        status: "error",
        message: errorMessage,
      };

      return response;
    }

    const image = result.data.image as File;
    const fileName = Date.now() + "_" + image.name.replace(" ", "-");
    const filePath = path.join(UPLOAD_FOLDER_DIR_PATH + `/${fileName}`);

    if (!fs.existsSync(UPLOAD_FOLDER_DIR_PATH)) {
      // on windows will fail on the root directory (!?)
      // on linux creates dir first time but probably with error...
      // eh
      fs.mkdir(UPLOAD_FOLDER_DIR_PATH, { recursive: true }, (error) => {
        if (error) {
          console.log("error creating local upload folder....");
        }
      });
    }

    try {
      const pump = promisify(pipeline);

      // yeah, I know... looks bad
      await pump(
        image.stream() as unknown as NodeJS.ReadableStream,
        fs.createWriteStream(filePath)
      );

      // image src, constructed for local development
      postImage = UPLOAD_FOLDER_DIR + "/" + fileName;

      // continue to create post
    } catch (error) {
      response = {
        status: "error",
        message: "File upload error. Try again later",
      };

      return response;
    }
  }

  // slugify post title and make it unique
  const slug = slugifyString(result.data.title) + "-" + uniqueSlug();

  // sanitize description
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const description = purify.sanitize(result.data.description);

  try {
    await prisma.post.create({
      data: {
        title: result.data.title,
        description,
        slug,
        categorySlug: result.data.categorySlug,
        userEmail: session.email!,
        image: postImage,
      },
    });

    revalidatePath("/");

    response = {
      status: "success",
      message: "Post successfully created",
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

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        slug,
      },
      select: {
        slug: true,
        title: true,
        description: true,
        views: true,
        image: true,
        createdAt: true,
        category: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    const response: PostServerResponse = {
      status: "success",
      message: "Post successfully fetched",
      post,
    };

    return response;
  } catch (error: unknown) {
    const response: PostServerResponse = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

export async function getAllPostsWithCount(page: number, cat?: string) {
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        where: {
          ...(cat && { categorySlug: cat }),
        },
        select: {
          slug: true,
          title: true,
          description: true,
          views: true,
          image: true,
          createdAt: true,
          category: {
            select: {
              title: true,
            },
          },
        },
        take: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * (page - 1),
      }),
      prisma.post.count({
        where: {
          ...(cat && { categorySlug: cat }),
        },
      }),
    ]);

    const response: PostServerResponse = {
      status: "success",
      message: "Posts successfully fetched",
      posts,
      count,
    };

    return response;
  } catch (error: unknown) {
    const response: PostServerResponse = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

export async function getAllPosts(page: number) {
  try {
    const posts = await prisma.post.findMany({
      select: {
        slug: true,
        title: true,
        description: true,
        views: true,
        image: true,
        createdAt: true,
        category: {
          select: {
            title: true,
          },
        },
      },
      take: POSTS_PER_PAGE,
      skip: POSTS_PER_PAGE * (page - 1),
    });

    const response: PostServerResponse = {
      status: "success",
      message: "Posts successfully fetched",
      posts,
    };

    return response;
  } catch (error: unknown) {
    const response: PostServerResponse = {
      status: "error",
      message: getErrorMessage(error),
    };

    return response;
  }
}

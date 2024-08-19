"use server";

import prisma from "@/lib/prismaClientDb";
import { Category, CategoryServerResponse } from "@/types/category";
import { getErrorMessage } from "@/actions/util";

export async function getAllCategories() {
  try {
    const categoryList = await prisma.category.findMany({
      select: {
        slug: true,
        title: true,
        type: true,
      },
    });

    const categories: Category[] = categoryList.map((category) => {
      return {
        slug: category.slug,
        title: category.title,
        href: `/blogs?category=${category.slug}`,
        type: category.type,
      };
    });

    const response: CategoryServerResponse = {
      status: "success",
      message: "Categories successfully fetched",
      categories,
    };

    return response;
  } catch (error: unknown) {
    const response: CategoryServerResponse = {
      status: "error",
      message: getErrorMessage(error),
      categories: [],
    };

    return response;
  }
}

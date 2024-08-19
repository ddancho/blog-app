import { Prisma } from "@prisma/client";

export const categories: Prisma.CategoryCreateInput[] = [
  {
    slug: "react",
    title: "react",
    type: "Framework",
  },
  {
    slug: "nextjs",
    title: "nextjs",
    type: "Framework",
  },
  {
    slug: "vue",
    title: "vue",
    type: "Framework",
  },
  {
    slug: "angular",
    title: "angular",
    type: "Framework",
  },
  {
    slug: "javascript",
    title: "javascript",
    type: "Language",
  },
  {
    slug: "typescript",
    title: "typescript",
    type: "Language",
  },
  {
    slug: "c-sharp",
    title: "C#",
    type: "Language",
  },
  {
    slug: "php",
    title: "php",
    type: "Language",
  },
];

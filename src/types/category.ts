import { ServerResponse } from "@/types/server";

type CategoryType = "Framework" | "Language";

export type Category = {
  slug: string;
  title: string;
  href: string;
  type: CategoryType;
};

export type CategoryServerResponse = ServerResponse & {
  categories: Category[];
};

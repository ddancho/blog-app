import { z } from "zod";
import { ServerResponse } from "@/types/server";
import { FILE_TYPES, MAX_FILE_SIZE } from "@/actions/util";

export type Post = {
  title: string;
  slug: string;
  description: string;
  views: number;
  image: string | null;
  createdAt: Date;
  category: {
    title: string;
  };
  categorySlug?: string;
  user?: {
    image: string | null;
    name: string;
  };
  userEmail?: string;
};

export type PostServerResponse = ServerResponse & {
  posts?: Post[];
  post?: Post;
  count?: number;
};

export const FormDataImageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "File is not valid. Try upload new file")
    .refine(
      (file) => FILE_TYPES.includes(file.type),
      "File type is not valid. Only jpeg,jpg and png"
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File is too big. Upload smaller file"
    ),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is to long"),
  categorySlug: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category is to long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Description is to long"),
});

export type CreatePost = z.infer<typeof CreatePostSchema>;

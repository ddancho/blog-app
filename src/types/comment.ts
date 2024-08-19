import { z } from "zod";
import { ServerResponse } from "@/types/server";

export const CreateCommentSchema = z.object({
  postSlug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(100, "Slug is too long"),
  description: z.string().min(1, "Description is required"),
});

export const WriteCommentSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export type CreateComment = z.infer<typeof WriteCommentSchema>;

// image - link to the image (bucket or server or local folder)

export type Comment = {
  createdAt: Date;
  description: string;
  user: {
    image: string | null;
    name: string;
  };
  userEmail?: string;
  postSlug?: string;
};

export type CommentServerResponse = ServerResponse & {
  comments?: Comment[];
  comment?: Comment;
};

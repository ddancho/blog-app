import { z } from "zod";

export const UserSignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name is too long"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email({ message: "Email is not valid" }),
    password: z
      .string()
      .trim()
      .min(6, "Password is too short")
      .max(100, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type UserSignUp = z.infer<typeof UserSignUpSchema>;

export const UserSignInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email({ message: "Email is not valid" }),
  password: z.string().trim().min(1, "Password is required"),
});

export type UserSignIn = z.infer<typeof UserSignInSchema>;

export const UserCheckSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email({ message: "Email is not valid" }),
});

export type UserCheck = z.infer<typeof UserCheckSchema>;

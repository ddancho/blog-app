"use client";

import styles from "@/components/commentForm/commentForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "@/actions/comment";
import { CreateComment, WriteCommentSchema } from "@/types/comment";
import toast from "react-hot-toast";

type CommentFormProps = {
  postSlug: string;
};

function CommentForm({ postSlug }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateComment>({
    resolver: zodResolver(WriteCommentSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (commentData: CreateComment) => {
    try {
      const { status } = await createComment({
        postSlug,
        description: commentData.description,
      });
      if (status === "error") {
        toast.error("Writting comment failed. Try again later.");
        reset();
        return;
      }

      toast.success("Comment created successfully");
      reset();

      return;
    } catch (error) {
      toast.error("Ups, this is serious, call admin.");
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.comment}>
        <textarea
          placeholder="write a comment..."
          className={styles.input}
          {...register("description")}
        />
        {errors.description && (
          <p className={styles.inputError}>{`${errors.description.message}`}</p>
        )}
      </div>
      <button type="submit" className={styles.button} disabled={isSubmitting}>
        Send
      </button>
    </form>
  );
}

export default CommentForm;

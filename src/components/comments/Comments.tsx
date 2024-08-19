import { getCommentsByPostSlug } from "@/actions/comment";
import { getSession } from "@/actions/session";
import styles from "@/components/comments/comments.module.css";
import Link from "next/link";
import Comment from "@/components/comment/Comment";
import dynamic from "next/dynamic";

type CommentsProps = {
  postSlug: string;
};

async function Comments({ postSlug }: CommentsProps) {
  const session = await getSession();

  const { comments } = await getCommentsByPostSlug(postSlug);

  const CommentForm = dynamic(
    () => import("@/components/commentForm/CommentForm"),
    {
      ssr: false,
    }
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {session.isLoggedIn ? (
        <CommentForm postSlug={postSlug} />
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {comments?.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Comments;

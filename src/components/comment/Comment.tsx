import styles from "@/components/comment/comment.module.css";
import { Comment as CommentType } from "@/types/comment";
import Image from "next/image";

type CommentProps = {
  comment: CommentType;
};

function Comment({ comment }: CommentProps) {
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        {comment.user.image && (
          <Image
            src={comment.user.image}
            alt=""
            width={50}
            height={50}
            className={styles.image}
          />
        )}
        <div className={styles.userInfo}>
          <span className={styles.username}>{comment.user.name}</span>
          <span className={styles.date}>
            {comment.createdAt.toDateString()}
          </span>
        </div>
      </div>
      <p className={styles.desc}>{comment.description}</p>
    </div>
  );
}

export default Comment;

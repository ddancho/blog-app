import styles from "@/components/post/post.module.css";
import Image from "next/image";
import Link from "next/link";
import { Post as PostType } from "@/types/post";

type PostProps = {
  post: PostType;
};

function Post({ post }: PostProps) {
  return (
    <div className={styles.container}>
      {post.image && (
        <div className={styles.imageContainer}>
          <Image src={post.image} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {post.createdAt.toDateString()} -{" "}
          </span>
          <span className={styles.category}>{post.category.title}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: post.description.substring(0, 100),
          }}
        />
        <Link href={`/posts/${post.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Post;

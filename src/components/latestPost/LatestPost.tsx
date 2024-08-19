import { getLatestPost } from "@/actions/post";
import styles from "@/components/latestPost/latestPost.module.css";
import Image from "next/image";
import Link from "next/link";

async function LatestPost() {
  const { post } = await getLatestPost();

  return (
    <div className={styles.container}>
      {post === undefined && <h1 className={styles.title}>No Posts</h1>}
      <div className={styles.post}>
        {post && (
          <>
            {post.image && (
              <div className={styles.imageContainer}>
                <Image src={post.image} alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <h1 className={styles.postTitle}>{post.title}</h1>
              <div
                className={styles.postDescription}
                dangerouslySetInnerHTML={{
                  __html: post.description.substring(0, 100),
                }}
              ></div>
              <Link href={`/posts/${post.slug}`} className={styles.button}>
                Read More
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LatestPost;

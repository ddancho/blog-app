import { getPostBySlug } from "@/actions/post";
import styles from "@/app/posts/[slug]/postPage.module.css";
import Comments from "@/components/comments/Comments";
import Image from "next/image";

type PostPageProps = {
  params: {
    slug: string;
  };
};

async function PostPage({ params }: PostPageProps) {
  const { post } = await getPostBySlug(params.slug);

  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.user}>
            {post?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={post?.user?.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user?.name}</span>
              <span className={styles.date}>
                {post?.createdAt.toDateString()}
              </span>
            </div>
          </div>
        </div>
        {post?.image && (
          <div className={styles.imageContainer}>
            <Image src={post.image} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: post?.description! }}
          />
          <div className={styles.comment}>
            <Comments postSlug={post?.slug!} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;

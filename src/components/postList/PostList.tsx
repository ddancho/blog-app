import styles from "@/components/postList/postList.module.css";
import Pagination from "@/components/pagination/Pagination";
import Post from "@/components/post/Post";
import { getAllPostsWithCount } from "@/actions/post";
import { POSTS_PER_PAGE } from "@/actions/util";

type PostListProps = {
  page: number;
  category?: string;
};

async function PostList({ page, category }: PostListProps) {
  const { posts, count } = await getAllPostsWithCount(page, category);

  const hasPrev = POSTS_PER_PAGE * (page - 1) > 0;
  const hasNext = POSTS_PER_PAGE * (page - 1) + POSTS_PER_PAGE < count!;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts && posts!.map((post) => <Post post={post} key={post.slug} />)}
      </div>
      <Pagination
        page={page}
        category={category}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}

export default PostList;

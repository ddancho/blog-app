import styles from "@/app/page.module.css";
import PostList from "@/components/postList/PostList";
import CategoryList from "@/components/categoryList/CategoryList";
import LatestPost from "@/components/latestPost/LatestPost";

type HomePageProps = {
  searchParams: {
    page: number;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  const page = searchParams.page || 1;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Starter</h1>
      <LatestPost />
      <CategoryList />
      <div className={styles.content}>
        <PostList page={page} />
      </div>
    </div>
  );
}

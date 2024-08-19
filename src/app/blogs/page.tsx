import styles from "@/app/blogs/blogsPage.module.css";
import PostList from "@/components/postList/PostList";

type BlogsPageProps = {
  searchParams: {
    category: string;
    page: number;
  };
};

function BlogsPage({ searchParams }: BlogsPageProps) {
  const page = searchParams.page || 1;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.category}>{searchParams.category}</span> Blogs
      </h1>
      <div className={styles.content}>
        <PostList page={page} category={searchParams.category} />
      </div>
    </div>
  );
}

export default BlogsPage;

import { getAllCategories } from "@/actions/category";
import styles from "@/components/categoryList/categoryList.module.css";
import Link from "next/link";

async function CategoryList() {
  const { categories } = await getAllCategories();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Popular Categories
        {categories.length === 0 && (
          <span className={styles.seed}>
            Please seed categories into database
          </span>
        )}
      </h1>
      <div className={styles.categories}>
        {categories.map((c) => (
          <Link
            href={c.href}
            className={`${styles.category} ${styles[c.type]}`}
            key={c.slug}
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;

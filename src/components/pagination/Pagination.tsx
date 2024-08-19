"use client";

import styles from "@/components/pagination/pagination.module.css";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  category?: string;
  hasPrev: boolean;
  hasNext: boolean;
};

function Pagination({ page, category, hasPrev, hasNext }: PaginationProps) {
  const router = useRouter();

  const handlePrev = (prev: number) => {
    if (hasPrev) {
      prev--;
      if (category) {
        router.push(`?category=${category}&page=${prev}`);
      } else {
        router.push(`?page=${prev}`);
      }
    }
  };

  const handleNext = (next: number) => {
    if (hasNext) {
      next++;
      if (category) {
        router.push(`?category=${category}&page=${next}`);
      } else {
        router.push(`?page=${next}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => handlePrev(page)}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        className={styles.button}
        onClick={() => handleNext(page)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

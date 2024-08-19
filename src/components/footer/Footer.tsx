import styles from "@/components/footer/footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>Blog Starter</h1>
        </div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptatum quidem veritatis reprehenderit obcaecati accusantium
          doloribus, et quo sint consequuntur magnam maxime, animi pariatur
          aliquam odit, omnis aspernatur voluptate minima?
        </p>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;

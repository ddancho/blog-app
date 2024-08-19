import styles from "@/components/navbar/navbar.module.css";
import Link from "next/link";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";
import dynamic from "next/dynamic";
import { getSession } from "@/actions/session";

async function Navbar() {
  let session = await getSession();

  const AuthLinks = dynamic(() => import("@/components/authLinks/AuthLinks"), {
    ssr: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Blog Starter</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/" className={styles.link}>
          Contact
        </Link>
        <Link href="/" className={styles.link}>
          About
        </Link>
        <AuthLinks isLoggedIn={session.isLoggedIn} />
      </div>
    </div>
  );
}

export default Navbar;

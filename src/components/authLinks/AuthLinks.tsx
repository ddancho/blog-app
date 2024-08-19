"use client";

import { logoutUser } from "@/actions/user";
import styles from "@/components/authLinks/authLinks.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type AuthLinksProps = {
  isLoggedIn: boolean;
};

function AuthLinks({ isLoggedIn }: AuthLinksProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await logoutUser();
    toast.success("User logout successfully");

    router.push("/");
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
          <Link href="/register" className={styles.link}>
            Register
          </Link>
        </>
      ) : (
        <>
          <Link href="/create" className={styles.link}>
            Create Post
          </Link>
          <span className={styles.link} onClick={() => onLogout()}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">Contact</Link>
          <Link href="/">About</Link>
          {!isLoggedIn ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/create">Create Post</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AuthLinks;

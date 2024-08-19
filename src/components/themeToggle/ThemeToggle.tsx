"use client";

import styles from "@/components/themeToggle/themeToggle.module.css";
import { useThemeContext } from "@/hooks/ThemeContext";
import Image from "next/image";

function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div
      className={styles.container}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { right: 1, backgroundColor: "#0f172a" }
      }
      onClick={() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }}
    >
      <Image src="/moon.png" alt="moon" width={14} height={14} />
      <div
        className={styles.circle}
        style={
          theme === "dark"
            ? { left: 1, backgroundColor: "#0f172a" }
            : { right: 1, backgroundColor: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="moon" width={14} height={14} />
    </div>
  );
}

export default ThemeToggle;

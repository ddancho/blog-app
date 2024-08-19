import styles from "@/app/login/loginPage.module.css";
import dynamic from "next/dynamic";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  const LoginForm = dynamic(() => import("@/components/authForms/LoginForm"), {
    ssr: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;

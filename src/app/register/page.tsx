import styles from "@/app/register/registerPage.module.css";
import dynamic from "next/dynamic";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

async function registerPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  const RegisterForm = dynamic(
    () => import("@/components/authForms/RegisterForm"),
    {
      ssr: false,
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm />
      </div>
    </div>
  );
}

export default registerPage;

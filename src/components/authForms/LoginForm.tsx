"use client";

import styles from "@/components/authForms/registerForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignIn, UserSignInSchema } from "@/types/user";
import toast from "react-hot-toast";
import { loginUser } from "@/actions/user";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (signInData: UserSignIn) => {
    try {
      const { status } = await loginUser(signInData);
      if (status === "error") {
        toast.error("SignIn failed. Try again later.");
        reset();
        return;
      }

      toast.success("You are successfully signed in");
      reset();

      return;
    } catch (error) {
      toast.error("Ups, this is serious, call admin.");
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register("email")}
        type="email"
        placeholder="Enter your email"
      />
      {errors.email && (
        <p className={styles.inputError}>{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Enter your password"
      />
      {errors.password && (
        <p className={styles.inputError}>{`${errors.password.message}`}</p>
      )}

      <div className={styles.signup}>
        <button type="submit" disabled={isSubmitting}>
          Sign In
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

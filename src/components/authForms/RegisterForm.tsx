"use client";

import styles from "@/components/authForms/registerForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUp, UserSignUpSchema } from "@/types/user";
import toast from "react-hot-toast";
import { registerUser } from "@/actions/user";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (signUpData: UserSignUp) => {
    try {
      const { status } = await registerUser(signUpData);
      if (status === "error") {
        toast.error("SignUp failed. Try again later.");
        reset();
        return;
      }

      toast.success("You are successfully signed up. Go and sign in.");
      router.push("/login");

      reset();
    } catch (error) {
      toast.error("Ups, this is serious, call admin.");
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input {...register("name")} type="text" placeholder="Enter your name" />
      {errors.name && (
        <p className={styles.inputError}>{`${errors.name.message}`}</p>
      )}
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
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm your password"
      />
      {errors.confirmPassword && (
        <p
          className={styles.inputError}
        >{`${errors.confirmPassword.message}`}</p>
      )}

      <div className={styles.signup}>
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;

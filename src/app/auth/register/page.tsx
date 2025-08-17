"use client";

import RegisterForm from "@/components/RegisterForm";
import { RegisterFormData } from "@/utils/types/users";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

const RegisterPage = () => {
  const auth = useAuth();

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      await auth?.register(formData);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen custom-font">
      <div className="w-full max-w-2xl flex items-center justify-center flex-col rounded-2xl shadow-[0_0_10px] my-8 p-4">
        <RegisterForm onSubmit={handleRegister} />

        <p className="text-secondary text-base text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="hover:text-sky-400 hover:underline transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

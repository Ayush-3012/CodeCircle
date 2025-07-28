/* eslint-disable @typescript-eslint/no-unused-vars */
// CLIENT COMPONENT FOR REGISTER
"use client";

import RegisterForm from "@/components/RegisterForm";
import { RegisterFormData } from "@/utils/types/users";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/hooks/useAuth";

const RegisterPage = () => {
  const auth = useAuth();

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      await auth?.register(formData);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-xl border rounded mx-auto flex items-center justify-center mt-2">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </>
  );
};

export default RegisterPage;

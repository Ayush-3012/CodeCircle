"use client";

import RegisterForm from "@/components/RegisterForm";
import { registerUser } from "@/services/authService";
import { RegisterFormData } from "@/utils/types/users";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      const res = await registerUser(formData);
      console.log("✅ User registered", res);
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error);
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

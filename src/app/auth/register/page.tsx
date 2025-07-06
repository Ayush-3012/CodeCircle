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
      <div className="max-w-4xl mx-auto mt-10 p-4 border rounded">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </>
  );
};

export default RegisterPage;

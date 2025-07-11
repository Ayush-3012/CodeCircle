// CLIENT COMPONENT FOR REGISTER
"use client";

import RegisterForm from "@/components/RegisterForm";
import { registerUser } from "@/services/authService";
import { RegisterFormData } from "@/utils/types/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      const res = await registerUser(formData);
      toast.success(res.message);
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-xl border rounded mx-auto flex items-center justify-center mt-2">
        <RegisterForm onSubmit={handleRegister} /> {/* USING REGISTER FORM  */}
      </div>
    </>
  );
};

export default RegisterPage;

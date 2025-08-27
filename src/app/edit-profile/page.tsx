/* eslint-disable @typescript-eslint/no-unused-vars */
// CLIENT COMPONENT TO EDIT PROFILE
"use client";

import RegisterForm from "@/components/RegisterForm";
import { RegisterFormData } from "@/utils/types/users";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useUser } from "@/lib/hooks/useUser";
import { RootState } from "@/lib/redux/store";
import Loader from "@/partials/Loader";

const EditProfilePage = () => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const { initialData, update, loading, setLoading } = useUser(user);

  const handleUpdate = async (data: RegisterFormData | FormData) => {
    try {
      if (data instanceof FormData) {
        const registerData: RegisterFormData = {
          name: data.get("name") as string,
          username: data.get("username") as string,
        };
        await update(registerData);
      } else {
        await update(data);
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) return <Loader />;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen custom-font">
        <motion.div
          className="w-full max-w-2xl flex items-center justify-center flex-col rounded-2xl shadow-[0_0_10px] my-8 p-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
        >
          <RegisterForm
            initialData={initialData}
            onSubmit={handleUpdate}
            isEdit={true}
            loading={loading}
          />
        </motion.div>
      </div>
    </>
  );
};

export default EditProfilePage;

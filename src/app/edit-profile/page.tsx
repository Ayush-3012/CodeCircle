/* eslint-disable @typescript-eslint/no-unused-vars */
// CLIENT COMPONENT TO EDIT PROFILE
"use client";

import RegisterForm from "@/components/RegisterForm";
import { RegisterFormData } from "@/utils/types/users";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useUser } from "@/lib/hooks/useUser";
import { RootState } from "@/lib/redux/store";

const EditProfilePage = () => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  const { initialData, update, loading, setLoading } = useUser(user);

  const handleUpdate = async (data: RegisterFormData) => {
    try {
      await update(data);
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="max-w-xl border rounded mx-auto flex items-center justify-center mt-2">
      <RegisterForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isEdit={true}
        loading={loading}
      />
    </div>
  );
};

export default EditProfilePage;

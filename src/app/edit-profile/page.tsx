// CLIENT COMPONENT TO EDIT PROFILE
"use client";

import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/services/userService";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import { RegisterFormData } from "@/utils/types/users";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EditProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<RegisterFormData | null>(null);

  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserProfile(user);
        if (res?.foundUser) {
          const user = res.foundUser;
          setInitialData({
            name: user.name || "",
            username: user.username || "",
            email: user.email || "",
            password: "",
            image: user.image || "",
            bio: user.bio || "",
            githubUrl: user.githubUrl || "",
            linkedInUrl: user.linkedInUrl || "",
            portfolioUrl: user.portfolioUrl || "",
          });
        }
      } catch (err) {
        console.error("Error loading profile", err);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      const res = await updateUserProfile(data);
      router.push(`/profile/${user}`);
      toast.success(res.message);
    } catch (err) {
      console.error("Error updating profile", err);
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

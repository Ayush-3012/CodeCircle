import { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
} from "../client/services/userService";
import { RegisterFormData } from "@/utils/types/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useUser = (user: string) => {
  const [initialData, setInitialData] = useState<RegisterFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserProfile(user);
        if (res?.data?.user) {
          const user = res.data.user;
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

  const update = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      const res = await updateUserProfile(data);
      toast.success(res.data.message);
      router.push(`/profile/${user}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return { initialData, update, loading, setLoading };
};

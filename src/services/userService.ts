import axios from "@/lib/axios";
import { RegisterFormData } from "@/utils/types/users";

export const getCurrentUserProfile = async (token: string | undefined) => {
  try {
    const res = await axios.get(`/user/profile`, {
      headers: {
        Cookie: `auth_token=${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPostsByUser = async (
  userId: string,
  token: string | undefined
) => {
  try {
    const res = await axios.get(`/post/user/${userId}`, {
      headers: {
        Cookie: `auth_token=${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateUserProfile = async (formData: RegisterFormData) => {
  const res = await axios.put(`/user/update`, formData);
  return res.data;
};

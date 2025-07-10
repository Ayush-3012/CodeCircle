import axios from "@/lib/axios";
import { RegisterFormData } from "@/utils/types/users";

export const getUserProfile = async (id: string) => {
  try {
    const res = await axios.get(`/user/${id}/profile`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPostsByUser = async (userId: string) => {
  try {
    const res = await axios.get(`/post/user/${userId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateUserProfile = async (formData: RegisterFormData) => {
  try {
    const res = await axios.put(`/user/update`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

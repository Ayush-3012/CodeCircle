import axios from "@/lib/axios";
import { RegisterFormData } from "@/utils/types/users";

export const getUserProfile = async (id: string) => {
  const res = await axios.get(`/user/${id}/profile`);
  return res;
};

// export const getPostsByUser = async (userId: string) => {
//   const res = await axios.get(`/post/user/${userId}`);
//   return res;
// };

export const updateUserProfile = async (formData: RegisterFormData) => {
  const res = await axios.put(`/user/update`, formData);
  return res;
};

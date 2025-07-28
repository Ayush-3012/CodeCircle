import axios from "@/lib/axios";
import { RegisterFormData } from "@/utils/types/users";

export const registerUser = async (formData: RegisterFormData) => {
  const res = await axios.post(`/auth/register`, formData);
  return res;
};

export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`/auth/login`, formData);
  return res;
};

export const isUserLoggedIn = async () => {
  const res = await axios.get("/auth/me");
  return res;
};

export const logoutUser = async () => {
  const res = await axios.post("/auth/logout");
  return res;
};

import axios from "@/lib/axios";
import { RegisterFormData } from "@/utils/types/users";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const res = await axios.post(`/auth/register`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`/auth/login`, formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const isUserLoggedIn = async () => {
  try {
    const res = await axios.get("/auth/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};

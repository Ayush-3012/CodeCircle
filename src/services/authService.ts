import axios from "@/lib/axios";

export const registerUser = async (formData: {
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
}) => {
  const res = await axios.post(`/auth/register`, formData);
  return res.data;
};

export const loginUser = async (FormData: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`/auth/login`, FormData);
  return res.data;
};

export const isUserLoggedIn = async () => {
  try {
    const res = await axios.get("/auth/me");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  const res = await axios.post("/auth/logout");
  return res.data;
};

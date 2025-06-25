import axios from "@/lib/axios";

export const getCurrentUserProfile = async () => {
  const res = await axios.get("/user/profile");
  //   return res.data;
  console.log(res);
};

export const getPostsByUser = async (userId: string) => {
  const res = await axios.get(`/post/user/${userId}`);
  return res.data;
};

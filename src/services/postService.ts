import axios from "@/lib/axios";

export const createPost = async (content: string) => {
  const res = await axios.post(`/post/create`, { content });
  return res.data;
};

export const getAllPosts = async () => {
  const res = await axios.get(`/post/allPosts`);
  return res.data;
};

export const getSinglePost = async (id: string) => {
  const res = await axios.get(`/post/${id}`);
  return res.data;
};

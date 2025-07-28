import axios from "@/lib/axios";

export const createPost = async (formData: FormData) => {
  const res = await axios.post(`/post/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getAllPosts = async () => {
  const res = await axios.get(`/post/allPosts`);
  return res;
};

export const getSinglePost = async (id: string) => {
  const res = await axios.get(`/post/${id}`);
  return res;
};

export const updatePost = async (postId: string, formData: FormData) => {
  const res = await axios.put(`/post/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const deletePost = async (postId: string) => {
  const res = await axios.delete(`/post/${postId}`);
  return res;
};

export const toggleLikePost = async (postId: string) => {
  const res = await axios.post(`/post/${postId}/like`);
  return res;
};

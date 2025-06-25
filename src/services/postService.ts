import axios from "@/lib/axios";

export const createPost = async (formData: FormData) => {
  const res = await axios.post(`/post/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

export const updatePost = async (postId: string, formData: FormData) => {
  const res = await axios.put(`/post/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deletePost = async (postId: string) => {
  const res = await axios.delete(`/post/${postId}`);
  return res.data;
};

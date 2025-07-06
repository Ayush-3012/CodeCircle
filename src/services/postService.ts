import axios from "@/lib/axios";

export const createPost = async (formData: FormData) => {
  const res = await axios.post(`/post/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllPosts = async (token: string | undefined) => {
  try {
    const res = await axios.get(`/post/allPosts`, {
      headers: {
        Cookie: `auth_token=${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getSinglePost = async (id: string, token: string | undefined) => {
  const res = await axios.get(`/post/${id}`, {
    headers: {
      Cookie: `auth_token=${token}`,
    },
  });
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

export const toggleLikePost = async (postId: string) => {
  const res = await axios.post(`/post/${postId}/like`);
  return res.data;
};

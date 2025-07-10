import axios from "@/lib/axios";

export const createPost = async (formData: FormData) => {
  try {
    const res = await axios.post(`/post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const res = await axios.get(`/post/allPosts`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const res = await axios.get(`/post/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (postId: string, formData: FormData) => {
  try {
    const res = await axios.put(`/post/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const res = await axios.delete(`/post/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleLikePost = async (postId: string) => {
  try {
    const res = await axios.post(`/post/${postId}/like`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

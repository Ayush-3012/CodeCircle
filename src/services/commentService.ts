import axios from "@/lib/axios";

export const getCommentsByPost = async (postId: string) => {
  try {
    const res = await axios.get(`/comment/post/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCommentToPost = async (postId: string, content: string) => {
  try {
    const res = await axios.post(`/comment/create`, { postId, content });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateComment = async (commentId: string, content: string) => {
  try {
    const res = await axios.put(`/comment/${commentId}`, { content });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const res = await axios.delete(`/comment/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

"use client";

import { useEffect, useState } from "react";
import {
  addCommentToPost,
  deleteComment,
  getCommentsByPost,
  updateComment,
} from "../client/services/commentService";
import toast from "react-hot-toast";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
    image?: string;
  };
};

export const useComment = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchAllComments();
  }, []);

  const fetchAllComments = async () => {
    try {
      const res = await getCommentsByPost(postId);
      setComments(res.data.comments);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!commentText.trim()) return;
      const res = await addCommentToPost(postId, commentText);
      toast.success(res.data.message);
      setCommentText("");
      fetchAllComments();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      if (!editText.trim()) return;

      const res = await updateComment(id, editText);
      toast.success(res.data.message);
      setEditingId(null);
      fetchAllComments();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteComment(id);
      toast.success(res.data.message);
      fetchAllComments();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return {
    comments,
    commentText,
    setCommentText,
    handleAdd,
    handleUpdate,
    handleDelete,
    editingId,
    setEditingId,
    editText,
    setEditText,
    fetchAllComments,
  };
};

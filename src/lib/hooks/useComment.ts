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

  // separate loading states
  const [adding, setAdding] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllComments();
  }, []);

  const fetchAllComments = async () => {
    try {
      const res = await getCommentsByPost(postId);
      setComments(res.data.comments);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch comments");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      setAdding(true);
      const res = await addCommentToPost(postId, commentText);
      toast.success(res.data.message);
      setCommentText("");
      fetchAllComments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editText.trim()) return;
    try {
      setUpdatingId(id);
      const res = await updateComment(id, editText);
      toast.success(res.data.message);
      setEditingId(null);
      setEditText("");
      fetchAllComments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update comment");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await deleteComment(id);
      toast.success(res.data.message);
      fetchAllComments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    } finally {
      setDeletingId(null);
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

    // loading states
    adding,
    updatingId,
    deletingId,
  };
};

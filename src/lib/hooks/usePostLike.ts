"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { toggleLikePost } from "@/lib/client/services/postService";

export const usePostLike = (
  initialLikes: string[],
  postId: string,
  currentUserId: string
) => {
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const hasLiked = likes.includes(currentUserId);

  const handleLike = async () => {
    try {
      const res: any = await toggleLikePost(postId);
      if (res?.updatedPost?.likes) setLikes(res.updatedPost.likes);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return { likes, hasLiked, handleLike };
};

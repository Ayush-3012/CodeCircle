"use client";

import { toggleLikePost } from "@/services/postService";
import CommentSection from "../CommentSection";
import { useState } from "react";
import toast from "react-hot-toast";

type PostInteractionArgs = {
  initialLikes: string[];
  currentUserId: string;
  postId: string;
  showCommentCount: boolean;
};

const PostInteraction = ({
  initialLikes,
  currentUserId,
  postId,
  showCommentCount,
}: PostInteractionArgs) => {
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const hasLiked = likes.includes(currentUserId);

  const handleLike = async () => {
    try {
      const res = await toggleLikePost(postId);
      if (res?.updatedPost?.likes) setLikes(res.updatedPost.likes);
      toast.success(res.message);
    } catch (err) {
      console.error("Like toggle failed", err);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mt-2 self-start ml-4">
        <button
          onClick={handleLike}
          className={`${
            hasLiked ? "text-pink-400" : "text-white"
          } hover:text-pink-600 cursor-pointer text-sm`}
        >
          {hasLiked ? "❤️ Unlike" : "🤍 Like"}
        </button>
        <span className="text-sm text-gray-500">{likes.length} Likes</span>
        {showCommentCount && <CommentSection postId={postId} fromFeed={true} />}
      </div>
    </>
  );
};

export default PostInteraction;

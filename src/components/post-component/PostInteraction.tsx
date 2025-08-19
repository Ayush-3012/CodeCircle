"use client";

import { usePostLike } from "@/lib/hooks/usePostLike";
import CommentSection from "./CommentSection";

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
  const { likes, hasLiked, handleLike } = usePostLike(
    initialLikes,
    postId,
    currentUserId
  );

  return (
    <>
      <div className="flex items-center gap-4 mt-2 self-start">
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

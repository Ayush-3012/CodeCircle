"use client";

import { usePostLike } from "@/lib/hooks/usePostLike";
import CommentSection from "./CommentSection";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoShareSocialSharp } from "react-icons/io5";

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
      <div className="flex items-center w-full justify-between mt-2">
        <div className="flex items-center self-start gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
              hasLiked ? "text-pink-400" : "text-white"
            } hover:text-pink-600 transition text-sm cursor-pointer`}
          >
            {hasLiked ? (
              <AiFillHeart className="text-2xl" />
            ) : (
              <AiOutlineHeart className="text-2xl" />
            )}
            <span>{likes.length}</span>
          </button>

          {showCommentCount && (
            <CommentSection postId={postId} fromFeed={true} />
          )}
        </div>

        <button className="flex items-center gap-1 text-primary hover:text-sky-400 cursor-pointer">
          <IoShareSocialSharp className="text-2xl" />
        </button>
      </div>
    </>
  );
};

export default PostInteraction;

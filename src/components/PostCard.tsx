"use client";

import { deletePost, toggleLikePost } from "@/services/postService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostForm from "./PostForm";
import Link from "next/link";
import CommentSection from "./CommentSection";

type PostCardProps = {
  id: string;
  content: string;
  createdAt: string;
  media: string | null;
  likes: string[];
  author: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
  currentUserId: string;
  showCommentCount?: boolean;
};

const PostCard = ({
  id,
  content,
  createdAt,
  media,
  likes: initialLikes,
  author,
  currentUserId,
  showCommentCount,
}: PostCardProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState<string[]>(initialLikes);
  const hasLiked = likes.includes(currentUserId);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      router.refresh();
    }
  };

  const handleLike = async () => {
    try {
      const res = await toggleLikePost(id);
      if (res?.updatedPost?.likes) {
        setLikes(res.updatedPost.likes);
      }
    } catch (err) {
      console.error("Like toggle failed", err);
    }
  };

  return (
    <>
      <div className="border rounded p-4 shadow-sm bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={author.image}
            alt={author.name}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {author.name}
            </p>
            <p className="text-sm text-gray-500">@{author.username}</p>
          </div>
        </div>

        {isEditing ? (
          <PostForm
            initialContent={content}
            initialMediaUrl={media || ""}
            isEditing={true}
            postId={id}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Link href={`/post/${id}`}>
              <p className="text-gray-800 dark:text-gray-200 text-xl mb-2">
                {content}
              </p>
              {media && (
                <Image
                  src={media}
                  height={200}
                  width={200}
                  alt="media"
                  className="bg-black mt-2 w-auto h-auto rounded-lg"
                />
              )}
              <p className="text-xs text-gray-500 self-start ml-4 mt-2">
                {new Date(createdAt).toLocaleString()}
              </p>
            </Link>
            <div className="flex items-center gap-4 mt-2 self-start ml-4">
              <button
                onClick={handleLike}
                className={`${
                  hasLiked ? "text-pink-400" : "text-white"
                } hover:text-pink-600 cursor-pointer text-sm`}
              >
                {hasLiked ? "❤️ Unlike" : "🤍 Like"}
              </button>
              <span className="text-sm text-gray-500">
                {likes.length} Likes
              </span>
              {showCommentCount && (
                <CommentSection postId={id} fromFeed={true} />
              )}
            </div>

            {currentUserId === author.id && (
              <div className="flex gap-4 mt-2 self-start ml-4">
                <button
                  onClick={handleDelete}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PostCard;

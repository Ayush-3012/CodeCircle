"use client";

import Image from "next/image";
import { useState } from "react";
import PostForm from "./PostForm";
import Link from "next/link";
import PostInteraction from "../post-component/PostInteraction";
import { defaultUserImage } from "@/utils/defautUserImage";
import { usePost } from "@/lib/hooks/usePost";

type PostCardProps = {
  id: string;
  content: string;
  createdAt: string;
  media: string | null;
  initialLikes: string[];
  author: {
    id: string;
    name: string;
    username: string;
    image: string | null;
  };
  currentUserId: string;
  showCommentCount: boolean;
  fromPostPage?: boolean;
};

const PostCard = ({
  id,
  content,
  createdAt,
  media,
  initialLikes,
  author,
  currentUserId,
  showCommentCount,
  fromPostPage,
}: PostCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const postHook = usePost();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?"))
      await postHook.remove(id);
  };

  const contentBlock = (
    <>
      <p className="text-gray-800 dark:text-gray-200 text-xl mb-2">{content}</p>
      {media && (
        <Image
          src={media}
          height={200}
          width={200}
          alt="media"
          className="bg-black w-auto h-auto mt-2 rounded-lg"
        />
      )}
    </>
  );

  return (
    <>
      <div className="border rounded p-4 shadow-sm bg-white dark:bg-gray-900">
        {/* POSTED BY - AUTHOR DETAILS */}
        <Link href={`/profile/${author.id}`}>
          <div className="flex items-center gap-3 mb-2">
            <Image
              src={author?.image || defaultUserImage}
              alt={author?.name}
              width={50}
              height={50}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {author.name}
              </p>
              <p className="text-sm text-gray-500">@{author.username}</p>
            </div>
          </div>
        </Link>

        {/* POST ITSELF EDITING OR VIEWING */}
        {isEditing ? (
          <PostForm
            initialContent={content}
            initialMediaUrl={media || defaultUserImage}
            isEditing={true}
            postId={id}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {fromPostPage ? (
              <div>{contentBlock}</div>
            ) : (
              <Link href={`/post/${id}`}>{contentBlock}</Link>
            )}
            <p className="text-xs text-gray-500 self-start ml-4 mt-2">
              {new Date(createdAt).toLocaleString()}
            </p>

            {/* POST LIKES OR COMMENT COUNT */}
            <PostInteraction
              initialLikes={initialLikes}
              currentUserId={currentUserId}
              postId={id}
              showCommentCount={showCommentCount}
            />

            {/* POST INTERACTION -> EDIT OR DELETE */}
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

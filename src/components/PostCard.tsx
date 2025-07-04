"use client";

import { deletePost } from "@/services/postService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostForm from "./PostForm";

type PostCardProps = {
  id: string;
  content: string;
  createdAt: string;
  media: string | null;
  author: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
  currentUserId: string;
};

const PostCard = ({
  id,
  content,
  media,
  createdAt,
  author,
  currentUserId,
}: PostCardProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      router.refresh();
    }
  };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={author.image}
          alt={author.name}
          width={50}
          height={50}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-black">{author.name}</p>
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
        <>
          <p className="text-gray-800">{content}</p>
          {media && (
            <Image
              src={media}
              height={200}
              width={200}
              alt={content}
              className="bg-black mt-2 w-auto h-auto"
            />
          )}
          <p className="text-xs text-gray-400 mt-2">
            {new Date(createdAt).toLocaleString()}
          </p>

          {currentUserId === author.id && (
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleDelete}
                className="text-red-500 cursor-pointer hover:underline"
              >
                Delete
              </button>
              <button
                onClick={handleEditToggle}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostCard;

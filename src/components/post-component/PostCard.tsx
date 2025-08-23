"use client";

import Image from "next/image";
import { useState } from "react";
import PostForm from "./PostForm";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <div className="shadow-[0_0_5px] shadow-emerald-400 rounded p-2">
      <p className="text-primary text-center text-xl mb-2">{content}</p>
      {media && (
        <Image
          src={media}
          height={300}
          width={400}
          alt="media"
          className="w-auto h-auto mt-2"
        />
      )}
    </div>
  );

  return (
    <>
      <motion.div
        className="shadow-[0_0_5px] shadow-emerald-400 rounded-2xl bg-nav p-4 "
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
      >
        {/* POSTED BY - AUTHOR DETAILS */}
        <div className="flex items-center justify-between mb-3">
          <Link href={`/profile/${author.id}`}>
            <div className="flex items-center gap-3">
              <Image
                src={author?.image || defaultUserImage}
                alt={author?.name}
                width={50}
                height={50}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-primary">{author.name}</p>
                <p className="text-sm text-secondary">@{author.username}</p>
              </div>
            </div>
          </Link>
          <p className="text-xs text-secondary mt-2 text-right">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        {/* POST ITSELF EDITING OR VIEWING */}
        {isEditing ? (
          <PostForm
            initialContent={content}
            initialMediaUrl={media || defaultUserImage}
            isEditing={true}
            setIsEditing={setIsEditing}
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

            {/* POST LIKES OR COMMENT COUNT */}
            <PostInteraction
              initialLikes={initialLikes}
              currentUserId={currentUserId}
              postId={id}
              showCommentCount={showCommentCount}
            />

            {/* POST INTERACTION -> EDIT OR DELETE */}
            {currentUserId === author.id && (
              <div className="flex gap-4 mt-3 self-start">
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
      </motion.div>
    </>
  );
};

export default PostCard;

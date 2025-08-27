"use client";

import Image from "next/image";
import { useState } from "react";
import PostForm from "./PostForm";
import Link from "next/link";
import { motion } from "framer-motion";
import PostInteraction from "../post-component/PostInteraction";
import { defaultUserImage } from "@/utils/defautUserImage";
import { usePost } from "@/lib/hooks/usePost";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

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
    <div className="shadow-[0_0_5px] shadow-emerald-400 rounded p-2 text-center">
      <p className="text-primary text-center text-xl mb-2">{content}</p>
      {media && (
        <Image
          src={media}
          height={300}
          width={400}
          alt="media"
          className="w-full h-auto mt-2 rounded-lg object-cover max-w-full"
        />
      )}
    </div>
  );

  return (
    <>
      <motion.div
        className="shadow-[0_0_5px] shadow-emerald-400 rounded-2xl bg-nav p-4 overflow-x-hidden"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
      >
        {/* POSTED BY - AUTHOR DETAILS */}
        <div className="flex items-center justify-between mb-3">
          <Link href={`/profile/${author.id}`}>
            <div className="flex items-center gap-2">
              <Image
                src={author?.image || defaultUserImage}
                alt={author?.name}
                width={50}
                height={50}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="flex flex-col gap-0">
                <p className="font-semibold text-primary">{author.name}</p>
                <p className="text-sm text-secondary">@{author.username}</p>
              </div>
            </div>
          </Link>
          <p className="text-xs text-secondary flex max-sm:flex-col max-sm:gap-0.5 gap-1 text-right">
            <span>{new Date(createdAt).toLocaleDateString()}</span>
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          {currentUserId === author.id && (
            <div className="flex flex-wrap gap-2 max-sm:flex-col max-md:gap-1">
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="text-sky-400 cursor-pointer hover:underline"
              >
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <span className="hidden md:inline">Edit</span>
                    <span className="md:hidden text-2xl max-sm:text-xl">
                      <MdEdit />
                    </span>
                  </>
                )}
              </button>
              <button
                onClick={handleDelete}
                className="text-rose-400 cursor-pointer hover:underline"
              >
                <span className="hidden md:inline">Delete</span>
                <span className="md:hidden text-2xl max-sm:text-xl">
                  <MdDeleteOutline />
                </span>
              </button>
            </div>
          )}
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
              <>{contentBlock}</>
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
          </div>
        )}
      </motion.div>
    </>
  );
};

export default PostCard;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePost } from "@/lib/hooks/usePost";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";

type PostFormProps = {
  initialContent?: string;
  initialMediaUrl?: string;
  isEditing?: boolean;
  postId?: string;
  onSuccess?: () => void;
};

const PostForm = ({
  initialContent = "",
  initialMediaUrl = "",
  isEditing = false,
  postId,
  onSuccess,
}: PostFormProps) => {
  const [content, setContent] = useState(initialContent);
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const postHook = usePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!content.trim() && !media) return;

      const formData = new FormData();
      formData.append("content", content);
      if (media) formData.append("media", media);

      if (isEditing) await postHook.update(postId!, formData);
      else await postHook.create(formData);

      setContent("");
      setMedia(null);
      onSuccess?.();
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex space-x-3 relative rounded-2xl shadow-[0_0_5px] shadow-emerald-400 bg-nav custom-font"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 text-xl placeholder:text-secondary focus:outline-none "
          rows={3}
        />

        {isEditing && initialMediaUrl && !media && (
          <div className="relative w-40 h-40 border rounded overflow-hidden mx-auto">
            <Image
              src={initialMediaUrl}
              alt="Current media"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex justify-center gap-4 flex-col h-full items-center absolute right-2 bottom-0">
          <div className="flex items-center gap-2">
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="p-2 shadow-[0_0_5px] cursor-pointer rounded-full text-secondary hover:bg-emerald-600 hover:text-white transition"
            >
              <FaFileUpload className="text-xl" />
            </label>
            {media && (
              <span className="text-sm text-secondary">
                {media.name.length > 15
                  ? media.name.slice(0, 15) + "..."
                  : media.name}
              </span>
            )}
          </div>

          {/* Post Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.6 }}
            className="px-6 py-2 rounded-md border cursor-pointer font-semibold hover-gradient text-primary"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Posting..."
              : isEditing
              ? "Update"
              : "Post"}
          </motion.button>
        </div>
      </form>
    </>
  );
};

export default PostForm;

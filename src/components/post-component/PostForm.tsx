/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePost } from "@/lib/hooks/usePost";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import Loader from "@/partials/Loader";

type PostFormProps = {
  initialContent?: string;
  initialMediaUrl?: string;
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
  postId?: string;
  onSuccess?: () => void;
};

const PostForm = ({
  initialContent = "",
  initialMediaUrl = "",
  isEditing = false,
  setIsEditing,
  postId,
  onSuccess,
}: PostFormProps) => {
  const [content, setContent] = useState(initialContent);
  const [media, setMedia] = useState<File | null>(null); // new media (only if user selects)
  const [loading, setLoading] = useState(false);
  const postHook = usePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !media && !initialMediaUrl) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);

      // 🟢 agar naya file select kiya hai to usko bhej
      if (media) {
        formData.append("media", media);
      }

      if (isEditing) {
        await postHook.update(postId!, formData);
        setIsEditing?.(false);
      } else {
        await postHook.create(formData);
      }

      setContent("");
      setMedia(null);
      onSuccess?.();
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col space-y-3 px-6 py-4 rounded-2xl shadow-[0_0_5px] 
        ${isEditing ? "shadow-blue-400" : "shadow-emerald-400"} 
        bg-nav custom-font`}
    >
      <div className="flex gap-2 items-center justify-center">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 text-lg rounded-md placeholder:text-secondary focus:outline-none text-primary bg-transparent border border-emerald-600"
          rows={3}
        />

        {/* IMAGE PREVIEW */}
        {(media || (isEditing && initialMediaUrl)) && (
          <div className="relative w-32 h-full overflow-hidden rounded-md border border-emerald-500">
            <Image
              src={media ? URL.createObjectURL(media) : initialMediaUrl!}
              alt="Uploaded media"
              width={600}
              height={400}
              className="object-contain mx-auto"
            />
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center">
        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <input
            id={`fileInput-${isEditing ? postId : "create"}`}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setMedia(file);
              e.target.value = "";
            }}
            className="hidden"
          />
          <label
            htmlFor={`fileInput-${isEditing ? postId : "create"}`}
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

        <div className="flex gap-2">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
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

          {(isEditing || media || content.trim()) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              className="px-6 py-2 rounded-md border cursor-pointer font-semibold hover:bg-rose-500 hover:text-white text-primary"
              onClick={(e) => {
                e.preventDefault();
                setContent(initialContent);
                setMedia(null);
                if (isEditing) setIsEditing?.(false);
              }}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PostForm;

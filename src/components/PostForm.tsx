"use client";

import { createPost, updatePost } from "@/services/postService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !media) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("media", media);

    const res = isEditing
      ? await updatePost(postId!, formData)
      : await createPost(formData);

    setLoading(false);

    if (res?.newPost || res?.updatedPost) {
      setContent("");
      setMedia(null);
      onSuccess?.();
      router.refresh();
    } else {
      alert("Post failed");
      console.log(res);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-black gap-3 border p-4 rounded"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="border p-2 rounded"
          rows={4}
        ></textarea>

        {isEditing && initialMediaUrl && !media && (
          <div className="relative w-40 h-40 border rounded overflow-hidden">
            <Image
              src={initialMediaUrl}
              alt="Current media"
              fill
              className="object-cover"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setMedia(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Posting..."
            : isEditing
            ? "Update"
            : "Post"}
        </button>
      </form>
    </>
  );
};

export default PostForm;

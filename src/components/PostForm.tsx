"use client";

import { createPost } from "@/services/postService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !media) return;

    setLoading(true);

    const formData = new FormData();
    if (content) formData.append("content", content);
    if (media) formData.append("media", media);

    const res = await createPost(formData);
    setLoading(false);

    if (res?.newPost) {
      setContent("");
      setMedia(null);
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
        className="flex flex-col gap-3 border p-4 rounded"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="border p-2 rounded"
          rows={4}
        ></textarea>

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
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </>
  );
};

export default PostForm;

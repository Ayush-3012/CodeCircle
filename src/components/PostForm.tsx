"use client";

import { createPost } from "@/services/postService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    const res = await createPost(content);
    setLoading(false);

    console.log(res);
    if (res?.newPost) {
      setContent("");
      router.refresh();
    } else {
      alert("Post failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="border p-2 rounded"
          rows={4}
        ></textarea>
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

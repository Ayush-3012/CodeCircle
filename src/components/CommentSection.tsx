"use client";

import {
  addCommentToPost,
  updateComment,
  getCommentsByPost,
  deleteComment,
} from "@/services/commentService";
import { defaultUserImage } from "@/utils/defautUserImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
    image?: string;
  };
};

const CommentSection = ({
  postId,
  fromFeed,
}: {
  postId: string;
  fromFeed: boolean;
}) => {
  const { user } = useSelector((state: any) => state.auth);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const fetchComments = async () => {
    const data = await getCommentsByPost(postId);
    setComments(data.comments);
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    await addCommentToPost(postId, commentText);
    setCommentText("");
    fetchComments();
  };

  const handleEditSubmit = async (id: string) => {
    if (!editText.trim()) return;
    await updateComment(id, editText);
    setEditingId(null);
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (fromFeed) {
    return (
      <span className="text-sm text-white">{comments?.length} Comments</span>
    );
  }

  return (
    <>
      <div className="p-4 border-t mt-4">
        <h3 className="font-semibold mb-2 text-white">
          Comments: {comments?.length}
        </h3>

        <div className="flex gap-2 mb-4">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="border px-3 py-1 rounded w-full bg-black text-white"
          />
          <button
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            className={`bg-blue-600 text-white px-4 py-1 rounded ${
              !commentText.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-400 cursor-pointer"
            }`}
          >
            Post
          </button>
        </div>

        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-gray-900 p-3 rounded-md border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-1 justify-between items-center">
                  <Image
                    src={c?.author?.image || defaultUserImage}
                    alt={c?.author?.name}
                    width={200}
                    height={200}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="flex gap-1">
                    <p className="text-sm text-blue-400 font-semibold">
                      {c.author?.name}:
                    </p>
                    {editingId === c.id ? (
                      <div className="flex flex-col items-center justify-center">
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="px-2 bg-black border rounded text-white"
                        />
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handleEditSubmit(c.id)}
                            className="text-green-400 cursor-pointer hover:text-green-600 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditText("");
                            }}
                            className="text-red-400 text-sm hover:text-red-600 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white text-sm">{c.content}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  {user === c.authorId && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(c.id);
                          setEditText(c.content);
                        }}
                        className="text-yellow-400 cursor-pointer hover:text-yellow-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-500 cursor-pointer hover:text-red-700 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {c.createdAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentSection;

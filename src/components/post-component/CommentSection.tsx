"use client";

import { useComment } from "@/lib/hooks/useComment";
import { RootState } from "@/lib/redux/store";
import { defaultUserImage } from "@/utils/defautUserImage";
import Image from "next/image";
import Link from "next/link";
import { FaComment, FaCommentDots } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const CommentSection = ({
  postId,
  fromFeed,
}: {
  postId: string;
  fromFeed: boolean;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    comments,
    commentText,
    setCommentText,
    handleAdd,
    handleUpdate,
    handleDelete,
    editingId,
    setEditingId,
    editText,
    setEditText,
    adding,
    updatingId,
    deletingId,
  } = useComment(postId);

  if (fromFeed) {
    return (
      <Link
        href={`/post/${postId}`}
        className="text-primary hover:text-emerald-400 flex gap-1"
      >
        <FaComment className="text-2xl" /> {comments?.length}
      </Link>
    );
  }

  return (
    <>
      <div className="p-4 border-t mt-4 max-md:p-2 max-sm:p-1">
        <h3 className="font-semibold mb-2 text-white">
          Comments: {comments?.length}
        </h3>

        <form onSubmit={handleAdd} className="sticky bottom-0 flex gap-2 p-2">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-1 rounded outline-none shadow-[0_0_5px] shadow-white focus:ring-2 focus:ring-sky-400 bg-nav text-white text-sm"
          />
          <button
            type="submit"
            disabled={!commentText.trim() || adding}
            className="px-4 py-1 border rounded text-primary hover-gradient cursor-pointer disabled:cursor-not-allowed"
          >
            {adding ? (
              "Commenting..."
            ) : (
              <>
                <span className="hidden md:inline">Comment</span>
                <span className="md:hidden text-xl">
                  <FaCommentDots />
                </span>
              </>
            )}
          </button>
        </form>

        <div className="flex flex-col max-h-[300px] overflow-y-auto gap-3 p-2">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex hover:translate-x-1.5 duration-150 transition-all justify-between items-start bg-nav p-2 rounded-md border"
            >
              <div className="flex gap-2 justify-between items-center">
                <Image
                  src={c?.author?.image || defaultUserImage}
                  alt={c?.author?.name}
                  width={200}
                  height={200}
                  className="rounded-full h-10 w-10 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-blue-400 font-semibold">
                    {c.author?.name}
                  </p>
                  {editingId === c.id ? (
                    <div className="flex flex-col items-center justify-center">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="px-2 bg-app border rounded text-white"
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleUpdate(c.id)}
                          className="text-green-400 cursor-pointer hover:text-green-600 text-sm"
                        >
                          {updatingId === c.id ? "Saving..." : "Save"}
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

              <div className="flex flex-col items-center max-sm:items-end justify-center">
                {user === c.authorId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(c.id);
                        setEditText(c.content);
                      }}
                      className="text-yellow-400 cursor-pointer hover:text-yellow-600 text-xs"
                    >
                      <span className="hidden md:inline">Edit</span>
                      <span className="md:hidden text-xl">
                        <MdEdit />
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this comment?"
                          )
                        )
                          handleDelete(c.id);
                      }}
                      disabled={deletingId === c.id}
                      className={`text-red-500 text-xs ${
                        deletingId === c.id
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:text-red-700 cursor-pointer"
                      }`}
                    >
                      {deletingId === c.id ? (
                        "Deleting..."
                      ) : (
                        <>
                          <span className="hidden md:inline">Delete</span>
                          <span className="md:hidden text-xl">
                            <MdDeleteOutline />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
                {c.createdAt && (
                  <span className="text-xs flex gap-1 max-md:flex-col max-md:gap-0.5 justify-end items-end text-gray-500">
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    <span>
                      {new Date(c.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentSection;

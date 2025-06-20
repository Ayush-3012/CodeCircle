"use client";

import Image from "next/image";

type PostCardProps = {
  content: string;
  createdAt: string;
  author: {
    name: string;
    username: string;
    image: string;
  };
};

const PostCard = ({ content, createdAt, author }: PostCardProps) => {
  return (
    <>
      <div className="border rounded p-4 shadow-sm bg-white">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={author.image}
            alt={author.name}
            width={200}
            height={200}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-black">{author.name}</p>
            <p className="text-sm text-gray-500">@{author.username}</p>
          </div>
        </div>
        <p className="text-gray-800">{content}</p>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </>
  );
};

export default PostCard;

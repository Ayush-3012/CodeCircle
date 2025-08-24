"use client";

import { toggleFollow } from "../../lib/client/services/followService";
import { useState } from "react";
import { motion } from "framer-motion";

const FollowButton = ({
  isFollowedInitially,
  userId,
  onToggle,
}: {
  isFollowedInitially: boolean;
  userId: string;
  onToggle?: () => void;
}) => {
  const [isFollowed, setIsFollowed] = useState(isFollowedInitially);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const res = await toggleFollow(userId);
      if (res.message === "Followed") setIsFollowed(true);
      else if (res.message === "Unfollowed") setIsFollowed(false);
      onToggle?.();
    } catch (err) {
      console.error("Follow action failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      disabled={loading}
      className={`px-5 py-2.5 rounded-md font-medium shadow-[0_0_5px] shadow-black
        ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        ${isFollowed ? "bg-gray-600 text-primary" : "bg-blue-300 text-gray-800"}
        active:scale-95`}
      whileHover={{ scaleX: 1.12 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.6 }}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : isFollowed ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </motion.button>
  );
};

export default FollowButton;

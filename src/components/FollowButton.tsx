"use client";

import { toggleFollow } from "@/services/followService";
import { useState } from "react";

const FollowButton = ({
  isFollowedInitially,
  targetUserId,
  onFollowChange,
}: {
  isFollowedInitially: boolean;
  targetUserId: string;
  onFollowChange?: (isNowFollowed: boolean) => void;
}) => {
  const [isFollowed, setIsFollowed] = useState(isFollowedInitially);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const res = await toggleFollow(targetUserId);
      if (res.message === "Followed") setIsFollowed(true);
      else if (res.message === "Unfollowed") setIsFollowed(false);

      onFollowChange?.(followed);
    } catch (err) {
      console.error("Follow action failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition ${
          isFollowed
            ? "bg-gray-500 hover:bg-gray-400"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {loading ? "Processing..." : isFollowed ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};

export default FollowButton;

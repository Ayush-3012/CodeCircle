"use clieint";

import { removeFollower } from "@/services/followService";
import { useState } from "react";
import toast from "react-hot-toast";

type RemoveFollowerButtonProps = {
  currentUserId: string;
  followerId: string;
  onRemoved: () => void;
};

const RemoveFollowerButton = ({
  currentUserId,
  followerId,
  onRemoved,
}: RemoveFollowerButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!confirm("Remove this follower?")) return;
    setLoading(true);
    try {
      await removeFollower(currentUserId, followerId);
      toast.success("Follower removed");
      onRemoved();
    } catch (err) {
      console.error(err);
      toast.error("Couldn’t remove follower");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleRemove}
        disabled={loading}
        className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded"
      >
        {loading ? "Removing…" : "Remove"}
      </button>
    </>
  );
};

export default RemoveFollowerButton;

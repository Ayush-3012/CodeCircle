"use clieint";

import { removeFollower } from "../../lib/client/services/followService";
import { useState } from "react";
import {motion} from "framer-motion";
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
      <motion.button
        onClick={handleRemove}
        disabled={loading}
        className={`px-5 py-2.5 rounded-md font-medium shadow-[0_0_5px] bg-gray-600 text-primary active:scale-95 shadow-black
        ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        active:scale-95`}
        whileHover={{ scaleX: 1.12 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.6 }}
      >
        {loading ? "Removing…" : "Remove"}
      </motion.button>
    </>
  );
};

export default RemoveFollowerButton;

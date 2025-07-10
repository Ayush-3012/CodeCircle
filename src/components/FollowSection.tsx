"use client";

import { getFollowerList, getFollowingList } from "@/services/followService";
import Link from "next/link";
import { useEffect, useState } from "react";
import FollowButton from "./FollowButton";

type FollowSectionProps = {
  targetUserId: string;
  currentUserId: string;
};

const FollowSection = ({ targetUserId, currentUserId }: FollowSectionProps) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState<boolean | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchFollowData = async () => {
      const followerData = await getFollowerList(targetUserId);
      if (!ignore) {
        setFollowerCount(followerData?.followers?.length || 0);

        const found = followerData?.followers?.some(
          (entry: any) => entry?.follower?.id === currentUserId
        );
        setIsFollowed(found);

        const followingData = await getFollowingList(targetUserId);
        setFollowingCount(followingData?.following?.length || 0);
      }
    };

    fetchFollowData();

    return () => {
      ignore = true;
    };
  }, [currentUserId, targetUserId]);

  const handleToggleFollow = () => {
    setIsFollowed((prev) => {
      const newStatus = !prev;
      setFollowerCount((count) => (newStatus ? count + 1 : count - 1));
      return newStatus;
    });
  };

  if (isFollowed === null) return null;

  return (
    <>
      <div className="flex items-center gap-2 justify-center flex-col">
        <div className="flex items-center gap-6 justify-center text-xl mt-2 text-gray-300">
          <Link
            href={`/profile/${targetUserId}/followList?type=followers`}
            className="hover:underline text-gray-300 text-xl"
          >
            Followers: {followerCount}
          </Link>
          <span>|</span>
          <Link
            href={`/profile/${targetUserId}/followList?type=following`}
            className="hover:underline"
          >
            Following: {followingCount}
          </Link>
        </div>

        {targetUserId !== currentUserId && (
          <FollowButton
            isFollowedInitially={isFollowed}
            targetUserId={targetUserId}
            onToggle={handleToggleFollow}
          />
        )}
      </div>
    </>
  );
};

export default FollowSection;

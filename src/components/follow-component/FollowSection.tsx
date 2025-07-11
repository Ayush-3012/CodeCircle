"use client";

import { getFollowerList, getFollowingList } from "@/services/followService";
import Link from "next/link";
import { useEffect, useState } from "react";
import FollowButton from "./FollowButton";

type FollowSectionProps = {
  currentUserId: string;
  profileId: string;
};

const FollowSection = ({ currentUserId, profileId }: FollowSectionProps) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState<boolean | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchFollowData = async () => {
      const followerData = await getFollowerList(profileId);
      if (!ignore) {
        setFollowerCount(followerData?.followers?.length || 0);

        const found = followerData?.followers?.some(
          (entry: any) => entry?.follower?.id === currentUserId
        );
        setIsFollowed(found);

        const followingData = await getFollowingList(profileId);
        setFollowingCount(followingData?.following?.length || 0);
      }
    };

    fetchFollowData();

    return () => {
      ignore = true;
    };
  }, [currentUserId, profileId]);

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
            href={`/profile/${profileId}/followList?type=followers`}
            className="hover:underline text-gray-300 text-xl"
          >
            Followers: {followerCount}
          </Link>
          <span>|</span>
          <Link
            href={`/profile/${profileId}/followList?type=following`}
            className="hover:underline"
          >
            Following: {followingCount}
          </Link>
        </div>

        {profileId !== currentUserId && (
          <FollowButton
            isFollowedInitially={isFollowed}
            userId={profileId}
            // profileId={profileId}
            // currentUserId={currentUserId}
            onToggle={handleToggleFollow}
          />
        )}
      </div>
    </>
  );
};

export default FollowSection;

"use client";

import {
  getFollowerList,
  getFollowingList,
} from "../../lib/client/services/followService";
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
    const newStatus = !isFollowed;
    setIsFollowed(newStatus);
    setFollowerCount((count) => (newStatus ? count + 1 : count - 1));
  };

  if (isFollowed === null) return null;

  return (
    <>
      <div className="flex text-center items-center justify-center gap-6 max-md:gap-4 max-sm:gap-2 text-primary">
        <Link
          href={`/profile/${profileId}/followList?type=followers`}
          className="hover:underline"
        >
          <p className="text-2xl font-bold max-md:text-xl max-sm:text-lg">{followerCount}</p>
          <p className="text-sm">Followers</p>
        </Link>
        <span className="text-5xl">|</span>
        <Link
          href={`/profile/${profileId}/followList?type=following`}
          className="hover:underline"
        >
          <p className="text-2xl font-bold max-md:text-xl max-sm:text-lg">{followingCount}</p>
          <p className="text-sm">Following</p>
        </Link>
      </div>

      {profileId !== currentUserId && (
        <FollowButton
          isFollowedInitially={isFollowed}
          userId={profileId}
          onToggle={handleToggleFollow}
        />
      )}
    </>
  );
};

export default FollowSection;

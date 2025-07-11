"use client";

import { defaultUserImage } from "@/utils/defautUserImage";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FollowButton from "./FollowButton";
import RemoveFollowerButton from "./RemoveFollowerButton";

type FollowListClientProps = {
  list: any[];
  type: "followers" | "following";
  profileId: string;
  currentUserId: string;
};

const FollowListClient = ({
  list,
  type,
  profileId,
  currentUserId,
}: FollowListClientProps) => {
  const [users, setUsers] = useState(list);

  const handleUnfollow = (userId: string) => {
    setUsers((prev) =>
      prev.filter((entry: any) => {
        const user = type === "followers" ? entry?.follower : entry?.following;
        return user?.id !== userId;
      })
    );
  };

  return (
    <>
      <div className="space-y-4">
        {users?.map((entry: any) => {
          const user =
            type === "followers" ? entry?.follower : entry?.following;

          if (!user) return null;

          return (
            <div
              key={user.id}
              className="flex bg-gray-600 gap-2 hover:bg-gray-800 rounded items-center p-2 justify-between"
            >
              <Link href={`/profile/${user.id}`} className="flex-1">
                <div className="flex items-center gap-2">
                  <Image
                    src={user.image || defaultUserImage}
                    alt={user.name}
                    width={200}
                    height={200}
                    className="rounded-full h-20 w-20 object-cover"
                  />
                  <div>
                    <p className="text-white text-lg">{user.name}</p>
                    <p className="text-gray-200 text-base">@{user.username}</p>
                  </div>
                </div>
              </Link>

              {type === "following" && user.id !== currentUserId && (
                <FollowButton
                  isFollowedInitially={true}
                  userId={user?.id}
                  // profileId={profileId}
                  // currentUserId={currentUserId}
                  onToggle={() => handleUnfollow(user?.id)}
                />
              )}

              {type === "followers" && profileId === currentUserId && (
                <RemoveFollowerButton
                  currentUserId={currentUserId}
                  followerId={user.id}
                  onRemoved={() =>
                    setUsers((prev) =>
                      prev.filter((e: any) => e.follower?.id !== user.id)
                    )
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FollowListClient;

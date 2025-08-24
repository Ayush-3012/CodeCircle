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
              className="flex items-center justify-between gap-4 p-4 rounded-xl 
                   bg-gradient-to-r from-cyan-800 hover-gradient via-purple-400/60 to-pink-400/60 
                   border border-gray-700 shadow-md hover:shadow-lg 
                   transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href={`/profile/${user.id}`} className="flex-1">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.image || defaultUserImage}
                    alt={user.name}
                    width={64}
                    height={64}
                    className="rounded-full h-16 w-16 object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {user.name}
                    </p>
                    <p className="text-gray-300 text-sm">@{user.username}</p>
                  </div>
                </div>
              </Link>

              <div className="flex gap-2">
                {type === "following" && user.id !== currentUserId && (
                  <FollowButton
                    isFollowedInitially={true}
                    userId={user?.id}
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FollowListClient;

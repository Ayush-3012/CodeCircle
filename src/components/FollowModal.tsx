"use client";

import { getFollowerList, getFollowingList } from "@/services/followService";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  userId: string;
  type: "followers" | "following";
}

const FollowModel = ({ userId, type }: Props) => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          type === "followers"
            ? await getFollowerList(userId, undefined)
            : await getFollowingList(userId, undefined);

        setList(type === "followers" ? data?.followers : data?.following);
      } catch (err) {
        console.error("Failed to fetch list", err);
      }
    };

    fetchData();
  }, [userId, type]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 capitalize">{type}</h2>
      <div className="space-y-4">
        {list?.map((entry: any) => {
          const user =
            type === "followers" ? entry?.follower : entry?.following;

          return (
            <Link
              href={`/profile/${user?.id}`}
              key={user?.id}
              className="flex items-center gap-4 p-2 bg-gray-600 hover:bg-gray-800 rounded"
            >
              <Image
                src={user?.image || "/default.png"}
                alt={user?.name}
                width={200}
                height={200}
                className="rounded-full h-20 w-20 object-cover"
              />
              <div>
                <p className="text-white text-lg">{user.name}</p>
                <p className="text-gray-200 text-base">@{user.username}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FollowModel;

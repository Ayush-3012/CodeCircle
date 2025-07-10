import FollowButton from "@/components/FollowButton";
import { getFollowerList, getFollowingList } from "@/services/followService";
import { getPostsByUser, getUserProfile } from "@/services/userService";
import { verifyToken } from "@/utils/token-manager";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const session = await verifyToken();
  const loggedInUserId = session?.userId;
  const { id } = await params;

  const { foundUser } = await getUserProfile(id, token);
  const postData = await getPostsByUser(foundUser?.id, token);
  const posts = postData?.posts;

  const followersData = await getFollowerList(foundUser?.id, token);
  const followingData = await getFollowingList(foundUser?.id, token);

  const isFollowed = followersData?.followers?.some(
    (follower: any) => follower?.follower?.id === loggedInUserId
  );

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={
              foundUser?.image ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            }
            alt={foundUser?.name}
            width={100}
            height={100}
            className="w-25 h-25 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{foundUser?.name}</h2>
            <p className="text-gray-400">@{foundUser?.username}</p>
          </div>
        </div>

        <div className="flex gap-6 mt-2 text-gray-300 text-xl">
          <Link
            href={`/profile/${foundUser?.id}/followList?type=followers`}
            className="hover:underline"
          >
            Followers: {followersData?.followers?.length}
          </Link>
          <span>|</span>
          <Link
            href={`/profile/${foundUser?.id}/followList?type=following`}
            className="hover:underline"
          >
            Following: {followingData?.following?.length}
          </Link>
        </div>

        <div className="flex gap-4 items-center justify-center">
          {foundUser.githubUrl && (
            <Link href={foundUser?.githubUrl} target="_blank">
              <FaGithub className="text-4xl text-fuchsia-400 hover:text-emerald-400" />
            </Link>
          )}
          {foundUser.linkedInUrl && (
            <Link href={foundUser?.linkedInUrl} target="_blank">
              <FaLinkedin className="text-4xl text-fuchsia-400 hover:text-emerald-400" />
            </Link>
          )}
          {foundUser.portfolioUrl && (
            <Link href={foundUser?.portfolioUrl} target="_blank">
              <FaCode className="text-4xl text-fuchsia-400 hover:text-emerald-400" />
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-gray-200">
          <p>Total Posts: {posts?.length}</p>
        </div>
        <div>
          <p className="text-lg font-serif">{foundUser?.bio}</p>
        </div>
        {loggedInUserId === foundUser?.id ? (
          <Link
            href={`/edit-profile/`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Edit Profile
          </Link>
        ) : (
          <FollowButton
            isFollowedInitially={isFollowed}
            targetUserId={foundUser?.id}
          />
        )}
      </div>

      <hr />

      <h3 className="text-xl text-white font-semibold mb-2">Your Posts</h3>
      <div className="grid max-md:grid-cols-2 grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:mx-4 w-full gap-8">
        {posts?.map((post: any) => (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="h-52 text-center group flex items-center justify-center hover:scale-105 cursor-pointer relative transition-all rounded-xl overflow-hidden duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-110 group-hover:opacity-30 "
              style={{
                backgroundImage: `url(${post.mediaUrl})`,
              }}
            ></div>
            <p className="text-xl font-bold text-white relative z-10 duration-200">
              {post.content}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

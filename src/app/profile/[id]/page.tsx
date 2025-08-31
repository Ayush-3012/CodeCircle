import SendMessageButton from "@/components/chat-component/SendMessageButton";
import FollowSection from "@/components/follow-component/FollowSection";
import { getAllPostsByUser } from "@/lib/backend/services/postServices/getAllPostsByUser";
import { getUserProfile } from "@/lib/backend/services/userServices/getUserProfile";
import { defaultUserImage } from "@/utils/defautUserImage";
import { verifyToken } from "@/utils/token-manager";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await verifyToken();
  if (!session || !session.userId) redirect("/auth/login");

  const { id } = await params;

  const [profile, profilePosts] = await Promise.all([
    getUserProfile(id),
    getAllPostsByUser(id),
  ]);

  const currentUserId = session?.userId;
  const profileId = profile?.id || id;

  return (
    <div className="max-w-7xl mx-auto mt-4 max-sm:px-3 px-6 space-y-6 max-md:space-y-4 max-sm:space-y-2">
      {/* PROFILE HEADER */}
      <div className="relative bg-gradient-to-r z-50 from-indigo-700 via-purple-400 to-pink-500 rounded-2xl max-sm:p-1.5 max-md:p-3 p-5 shadow-[0_0_10px] shadow-white">
        <div className="flex max-md:flex-col items-center justify-between gap-4 max-md:gap-3 max-sm:gap-2 p-2">
          <div className="flex max-md:justify-center max-sm:items-center max-sm:gap-2 max-md:gap-4 gap-6 w-full">
            <Image
              src={profile?.image || defaultUserImage}
              alt={profile?.name || "User Image"}
              width={140}
              height={140}
              className="rounded-full w-32 h-32 max-md:w-24 max-md:h-24 max-sm:w-16 max-sm:h-16 object-cover border-4 border-emerald-400"
            />
            <div className="text-center sm:text-left">
              <h2 className="max-md:text-2xl text-3xl max-sm:text-xl font-bold text-primary">
                {profile?.name}
              </h2>
              <p className="text-gray-200 max-md:text-base max-sm:text-sm text-xl">
                @{profile?.username}
              </p>
              <p className="text-gray-100 italic mt-2 max-sm:mt-1 max-w-md">
                {profile?.bio}
              </p>
            </div>
          </div>

          {/* Right: Buttons + Social Links */}
          <div className="flex flex-col items-center gap-6 max-md:w-full max-md:flex-row max-md:justify-around">
            <div className="flex gap-4 justify-center sm:justify-end">
              {profile?.githubUrl && (
                <Link
                  href={profile.githubUrl}
                  target="_blank"
                  className="group"
                >
                  <FaGithub className="max-sm:text-2xl max-md:text-3xl text-4xl text-white/90 group-hover:text-white transition-all transform group-hover:scale-110" />
                </Link>
              )}
              {profile?.linkedInUrl && (
                <Link
                  href={profile.linkedInUrl}
                  target="_blank"
                  className="group"
                >
                  <FaLinkedin className="max-sm:text-2xl max-md:text-3xl text-4xl text-white/90 group-hover:text-white transition-all transform group-hover:scale-110" />
                </Link>
              )}
              {profile?.portfolioUrl && (
                <Link
                  href={profile.portfolioUrl}
                  target="_blank"
                  className="group"
                >
                  <FaCode className="max-sm:text-2xl max-md:text-3xl text-4xl text-white/90 group-hover:text-white transition-all transform group-hover:scale-110" />
                </Link>
              )}
            </div>
            <div className="hover:scale-110 duration-150 transition-all">
              {currentUserId !== profileId ? (
                <SendMessageButton targetUserId={profileId} />
              ) : (
                <Link
                  href={`/edit-profile`}
                  className="cursor-pointer max-sm:px-3 max-sm:py-1.5 hover-gradient px-4 py-2 rounded-md text-primary   font-semibold max-sm:text-sm shadow-[0_0_5px] shadow-black"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-around bg-gradient-to-br from-indigo-500 to-emerald-500 mt-3 max-md:mt-2 max-sm:mt-1 rounded-xl p-3 max-md:p-2 max-sm:p-1 text-center shadow-[0_0_5px] shadow-black gap-4">
          <div className="max-sm:hidden">
            <p className="max-md:text-xl text-2xl font-bold text-primary">
              {profilePosts?.length}
            </p>
            <p className="text-primary text-base max-sm:text-sm">Posts</p>
          </div>
          <FollowSection currentUserId={currentUserId} profileId={profileId} />
        </div>
      </div>

      {/* POSTS */}
      <div className="mb-8 border-t-2 ">
        {profilePosts?.length === 0 ? (
          <h3 className="text-primary font-bold mb-4 text-xl sm:text-2xl text-center">
            No posts found.
          </h3>
        ) : (
          <>
            <h3 className="text-lg sm:text-xl text-primary font-semibold mb-4">
              Posts
            </h3>
            <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-6">
              {profilePosts?.map((post: any) => (
                <Link
                  href={`/post/${post.id}`}
                  key={post.id}
                  className="relative overflow-hidden text-center rounded-xl group shadow-[0_0_5px] shadow-white hover:scale-105 transition-all duration-150 flex items-center justify-center aspect-square"
                >
                  {post.mediaUrl ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${post.mediaUrl})` }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-3">
                        <p className="text-lg font-semibold text-white">
                          {post.content}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="max-sm:text-sm max-md:text-base text-lg font-semibold text-primary text-center p-2">
                      {post.content}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

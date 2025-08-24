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
    <div className="max-w-7xl mx-auto mt-10 px-4 space-y-2">
      <div className="relative bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl p-8 shadow-xl border border-gray-700">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
          {/* Left: Avatar + info */}
          <div className="flex items-center gap-6">
            <Image
              src={profile?.image || defaultUserImage}
              alt={profile?.name || "User Image"}
              width={140}
              height={140}
              className="rounded-full w-36 h-36 object-cover border-4 border-white/40 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-white">{profile?.name}</h2>
              <p className="text-gray-200">@{profile?.username}</p>
              <p className="text-gray-100 italic mt-2 max-w-md">
                {profile?.bio}
              </p>
            </div>
          </div>

          {/* Right: Buttons + Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              {profile?.githubUrl && (
                <Link href={profile.githubUrl} target="_blank">
                  <FaGithub className="text-3xl text-white/90 hover:text-white hover:scale-110 transition" />
                </Link>
              )}
              {profile?.linkedInUrl && (
                <Link href={profile.linkedInUrl} target="_blank">
                  <FaLinkedin className="text-3xl text-white/90 hover:text-white hover:scale-110 transition" />
                </Link>
              )}
              {profile?.portfolioUrl && (
                <Link href={profile.portfolioUrl} target="_blank">
                  <FaCode className="text-3xl text-white/90 hover:text-white hover:scale-110 transition" />
                </Link>
              )}
            </div>

            <div>
              {currentUserId !== profileId ? (
                <SendMessageButton targetUserId={profileId} />
              ) : (
                <Link
                  href={`/edit-profile`}
                  className="px-4 py-2 rounded-md border border-white/40 text-white hover:scale-105 hover:bg-fuchsia-600 transition-all duration-150 cursor-pointer font-semibold"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around bg-gradient-to-r from-indigo-700 via-purple-400 to-pink-500 border border-gray-700 rounded-xl p-4 text-center shadow">
        <div>
          <p className="text-2xl font-bold text-white">
            {profilePosts?.length}
          </p>
          <p className="text-gray-200 text-sm">Posts</p>
        </div>

        <FollowSection currentUserId={currentUserId} profileId={profileId} />
      </div>

      <hr />

      <div className="mb-8">
        {profilePosts?.length === 0 ? (
          <h3 className="text-primary font-bold mb-4 text-2xl text-center">No posts found.</h3>
        ) : (
          <>
            <h3 className="text-xl text-primary font-semibold mb-4">Posts</h3>
            <div className="grid max-md:grid-cols-2 grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-1 gap-6">
              {profilePosts?.map((post: any) => (
                <Link
                  href={`/post/${post.id}`}
                  key={post.id}
                  className="h-72 border text-center group flex items-center justify-center hover:scale-105 cursor-pointer relative transition-all rounded-xl overflow-hidden duration-300"
                >
                  {post.mediaUrl ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${post.mediaUrl})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-3">
                        <p className="text-lg font-semibold text-white">
                          {post.content}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-primary text-center transition-transform duration-500 group-hover:scale-110">
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

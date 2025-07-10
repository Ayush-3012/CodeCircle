import FollowSection from "@/components/FollowSection";
import { getAllPostsByUser } from "@/lib/services/postServices/getAllPostsByUser";
import { getUserProfile } from "@/lib/services/userServices/getUserProfile";
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
  const currentUserId = session?.userId;

  const [user, userPosts] = await Promise.all([
    getUserProfile(id),
    getAllPostsByUser(id),
  ]);

  const userId = user?.id || id;

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 space-y-6 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <Image
            src={user?.image || defaultUserImage}
            alt={user?.name || "User Image"}
            width={100}
            height={100}
            className="w-25 h-25 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-400">@{user?.username}</p>
          </div>
        </div>

        <FollowSection currentUserId={currentUserId} targetUserId={userId} />

        <div className="flex gap-4 items-center justify-center">
          {user?.githubUrl && (
            <Link href={user.githubUrl} target="_blank">
              <FaGithub className="text-4xl text-fuchsia-400 hover:text-emerald-400" />
            </Link>
          )}
          {user?.linkedInUrl && (
            <Link href={user.linkedInUrl} target="_blank">
              <FaLinkedin className="text-4xl text-fuchsia-400 hover:text-emerald-400" />
            </Link>
          )}
          {user?.portfolioUrl && (
            <Link href={user.portfolioUrl} target="_blank">
              <FaCode className="text-4xl text-fuchsia-400 hover:text-emerald-400" />
            </Link>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center p-2">
        <div className="text-gray-200">
          <p>Total Posts: {userPosts?.length}</p>
        </div>
        <div>
          <p className="text-lg font-serif">{user?.bio}</p>
        </div>
        {currentUserId === userId && (
          <Link
            href={`/edit-profile`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Edit Profile
          </Link>
        )}
      </div>

      <hr />

      <h3 className="text-xl text-white font-semibold mb-2">Your Posts</h3>
      <div className="grid max-md:grid-cols-2 grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:mx-4 w-full gap-8">
        {userPosts?.map((post: any) => (
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

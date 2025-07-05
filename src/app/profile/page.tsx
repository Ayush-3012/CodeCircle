import { getCurrentUserProfile, getPostsByUser } from "@/services/userService";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const { foundUser } = await getCurrentUserProfile(token);
  const postData = await getPostsByUser(foundUser?.id, token);
  const posts = postData.posts;

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Image
          src={foundUser.image}
          alt={foundUser.name}
          width={100}
          height={100}
          className="w-25 h-25 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{foundUser.name}</h2>
          <p className="text-gray-400">@{foundUser.username}</p>
        </div>
      </div>

      <div className="text-gray-200">
        <p>Total Posts: {posts.length}</p>
      </div>

      <hr />

      <div className="grid max-md:grid-cols-2 grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:mx-4 w-full gap-8">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="h-52 text-center group flex items-center justify-center hover:scale-105 cursor-pointer relative transition-all rounded-xl overflow-hidden duration-300"
            // onClick={() => navigate(`/books/${category.category}`)}
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
          </div>
        ))}
      </div>
    </div>
  );
}

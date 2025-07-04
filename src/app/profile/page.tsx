import { getCurrentUserProfile, getPostsByUser } from "@/services/userService";
import { cookies } from "next/headers";
// import PostCard from "@/components/PostCard";
// import Image from "next/image";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get(process.env.COOKIE_NAME!)?.value;

  const user = await getCurrentUserProfile(token);
  //   const postData = await getPostsByUser(user.userId);
  //   const posts = postData.posts;

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 space-y-6">
      <div className="flex items-center gap-4">
        {/* <Image
          src={user.image}
          alt={user.name}
          fill
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div> */}
      </div>

      {/* <div className="text-gray-700">
        <p>Total Posts: {posts.length}</p>
      </div>

      <hr />

      <div className="space-y-4">
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            media={post.mediaUrl}
            createdAt={post.createdAt}
            author={{
              id: post.author.id,
              name: post.author.name,
              username: post.author.username,
              image: post.author.image,
            }}
            currentUserId={user.userId}
          />
        ))}
      </div> */}
    </div>
  );
}

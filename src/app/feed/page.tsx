//  SERVER COMPONENT - FEED

import PostCard from "@/components/post-component/PostCard";
import PostForm from "@/components/post-component/PostForm";
import { getCurrentUser } from "@/lib/services/authSerivces/getCurrentUser";
import { getAllPosts } from "@/lib/services/postServices/getAllPosts";
import { verifyToken } from "@/utils/token-manager";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const session = await verifyToken();
  if (!session || !session.userId) redirect("/auth/login");

  let posts: any[] = [];

  try {
    posts = await getAllPosts();
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }
  const user = await getCurrentUser();

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        <PostForm />
        <hr />
        {posts?.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts?.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              media={post.mediaUrl}
              initialLikes={post.likes}
              createdAt={post.createdAt}
              author={{
                id: post.author.id,
                name: post.author.name,
                username: post.author.username,
                image: post.author.image,
              }}
              currentUserId={user?.id || ""}
              showCommentCount={true}
            />
          ))
        )}
      </div>
    </>
  );
}

//  SERVER COMPONENT - FEED

import PostCard from "@/components/post-component/PostCard";
import PostForm from "@/components/post-component/PostForm";
import { getAllPosts } from "@/lib/backend/services/postServices/getAllPosts";
import { verifyToken } from "@/utils/token-manager";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const session = await verifyToken();
  if (!session || !session.userId) redirect("/");

  let posts: unknown[] = [];

  try {
    posts = await getAllPosts();
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }

  return (
    <>
      <div className="w-full max-w-3xl mx-auto mt-6 sm:mt-10 space-y-4 px-3 sm:px-6 pb-20 md:pb-0 overflow-x-hidden">
        <PostForm />
        <hr />
        {posts?.length === 0 ? (
          <p className="text-secondary">No posts found.</p>
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
              currentUserId={session?.userId || ""}
              showCommentCount={true}
              fromPostPage={false}
            />
          ))
        )}
      </div>
    </>
  );
}

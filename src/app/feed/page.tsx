//  SERVER COMPONENT - FEED

import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { getAllPosts } from "@/services/postService";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { cookies } from "next/headers";

export default async function FeedPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const res = await getAllPosts(token);
  const posts = (await res?.allPosts) || [];

  const user = await getCurrentUser();

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        <PostForm />
        <hr />
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts?.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              media={post.mediaUrl}
              likes={post.likes}
              createdAt={post.createdAt}
              author={{
                id: post.author.id,
                name: post.author.name,
                username: post.author.username,
                image: post.author.image,
              }}
              currentUserId={user?.userId || ""}
              showCommentCount={true}
            />
          ))
        )}
      </div>
    </>
  );
}

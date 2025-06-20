import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { getAllPosts } from "@/services/postService";

export default async function FeedPage() {
  const res = await getAllPosts();
  const posts = (await res?.allPosts) || [];

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 space-y-4">
        <PostForm />
        <hr />
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts.map((post: any) => (
            <PostCard
              key={post.id}
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
            />
          ))
        )}
      </div>
    </>
  );
}

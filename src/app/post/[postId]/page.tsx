import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection";
import PostCard from "@/components/PostCard";
import { getSinglePost } from "@/services/postService";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/utils/getCurrentUser";

interface PostDetailsProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostDetailsProps) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  const { postId } = await params;
  const postData = await getSinglePost(postId, token);
  const user = await getCurrentUser();

  if (!postData) return notFound();

  const { foundPost } = postData;
  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <PostCard
          id={foundPost.id}
          content={foundPost.content}
          media={foundPost.mediaUrl}
          likes={foundPost.likes}
          createdAt={foundPost.createdAt}
          author={{
            id: foundPost.author.id,
            name: foundPost.author.name,
            username: foundPost.author.username,
            image: foundPost.author.image,
          }}
          currentUserId={user?.userId || ""}
          showCommentCount={false}
        />
        <CommentSection postId={postId} fromFeed={false} />
      </div>
    </>
  );
}

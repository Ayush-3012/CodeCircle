import { notFound, redirect } from "next/navigation";
import CommentSection from "@/components/CommentSection";
import PostCard from "@/components/PostCard";
import { verifyToken } from "@/utils/token-manager";
import { getPostById } from "@/lib/services/postServices/getPostById";
import { getCurrentUser } from "@/lib/services/authSerivces/getCurrentUser";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const session = await verifyToken();
  if (!session || !session.userId) redirect("/auth/login");

  const { postId } = await params;
  const postData = await getPostById(postId);
  const user = await getCurrentUser();

  if (!postData) return notFound();

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <PostCard
          id={postData?.id}
          content={postData?.content}
          media={postData?.mediaUrl}
          initialLikes={postData?.likes}
          createdAt={String(postData?.createdAt)}
          author={{
            id: postData?.author?.id,
            name: postData?.author?.name,
            username: postData?.author?.username,
            image: postData?.author?.image,
          }}
          currentUserId={user?.id || ""}
          showCommentCount={false}
        />
        <CommentSection postId={postId} fromFeed={false} />
      </div>
    </>
  );
}

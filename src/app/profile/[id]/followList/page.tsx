import FollowListClient from "@/components/follow-component/FollowListClient";
import { getFollowers } from "@/lib/services/userServices/getFollowers";
import { getFollowings } from "@/lib/services/userServices/getFollowings";
import { verifyToken } from "@/utils/token-manager";
import { redirect } from "next/navigation";

interface FollowListPageProps {
  params: { id: string };
  searchParams: { type: "followers" | "following" };
}

export default async function FollowListPage({
  params,
  searchParams,
}: FollowListPageProps) {
  const session = await verifyToken();
  if (!session || !session.userId) redirect("/auth/login");

  const { id: profileId } = await params;
  const { type } = await searchParams;
  const currentUserId = session?.userId;

  const list =
    type === "followers"
      ? await getFollowers(profileId)
      : await getFollowings(profileId);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{type} :</h2>
      <FollowListClient list={list} type={type} profileId={profileId} currentUserId={currentUserId} />
    </div>
  );
}

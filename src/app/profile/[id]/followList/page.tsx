import FollowModel from "@/components/FollowModal";

interface FollowListPageProps {
  params: { id: string };
  searchParams: { type: "followers" | "following" };
}

export default async function FollowListPage({
  params,
  searchParams,
}: FollowListPageProps) {
  const { id } = await params;
  const { type } = await searchParams;

  return (
    <div className="p-4">
      <FollowModel userId={id} type={type} />
    </div>
  );
}

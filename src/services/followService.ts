import axios from "@/lib/axios";

export const toggleFollow = async (targetUserId: string) => {
  try {
    const res = await axios.post(`/user/${targetUserId}/follow`);
    return res.data;
  } catch (error) {
    console.error("Follow/Unfollow failed:", error);
    throw error;
  }
};

export const getFollowerList = async (
  userId: string,
  token: string | undefined
) => {
  const res = await axios.get(`/user/${userId}/followers`, {
    headers: {
      Cookie: `auth_token=${token}`,
    },
  });
  return res.data;
};

export const getFollowingList = async (
  userId: string,
  token: string | undefined
) => {
  const res = await axios.get(`/user/${userId}/following`, {
    headers: {
      Cookie: `auth_token=${token}`,
    },
  });
  return res.data;
};

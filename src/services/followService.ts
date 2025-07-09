import axios from "@/lib/axios";

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

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

export const getFollowerList = async (userId: string) => {
  try {
    const res = await axios.get(`/user/${userId}/followers`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowingList = async (userId: string) => {
  try {
    const res = await axios.get(`/user/${userId}/following`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axios from "@/lib/axios";

export const getCurrentUserProfile = async (token: string | undefined) => {
  try {
    const res = await axios.get(`/user/profile`, {
      headers: {
        Cookie: token && `${(process.env.COOKIE_NAME = token)}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPostsByUser = async (userId: string) => {
  const res = await axios.get(`/post/user/${userId}`);
  return res.data;
};

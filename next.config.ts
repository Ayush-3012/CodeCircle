import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://pbs.twimg.com/amplify_video_thumb/1845722657842462735/img/JEkW7_ejlcOhe4Fo.jpg"
      ),
    ],
  },
};

export default nextConfig;

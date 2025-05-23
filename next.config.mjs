/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/fondy-redirect",
        destination: "/?paid",
      },
    ];
  },
};

export default nextConfig;

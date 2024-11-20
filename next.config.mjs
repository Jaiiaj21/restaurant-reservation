/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["drive.google.com"],
  },
  env: {
    NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
};

export default nextConfig;

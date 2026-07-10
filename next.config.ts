import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — exported as plain HTML/CSS/JS to `out/`.
  // Deployed to Cloudflare Pages (static assets → no Worker CPU limits, no 1102 errors).
  output: "export",
  trailingSlash: true,
  images: {
    // The static export has no image-optimization server; serve images as-is.
    unoptimized: true,
  },
};

export default nextConfig;

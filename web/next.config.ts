import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Git repo root (parent of web/) — where Turbopack resolves CSS deps
    root: path.resolve(__dirname, ".."),
  },
};

export default nextConfig;

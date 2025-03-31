import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    experimental: {
        mdxRs: true, // 启用Rust实现的MDX编译器
    },

    //FIX:  https://github.com/vercel/next.js/issues/76395#issuecomment-2721048784
    //NOTE: https://github.com/vercel/next.js/issues/77216
    //      https://github.com/hashicorp/next-mdx-remote/issues/488
    transpilePackages: ["next-mdx-remote"],

    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
        loader: "custom",
        loaderFile: "./src/lib/image_loader.ts", // custom img loader
    },
};

export default nextConfig;

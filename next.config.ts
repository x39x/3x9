import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    experimental: {
        mdxRs: true, // 启用Rust实现的MDX编译器
    },

    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
        loader: "custom",
        loaderFile: "./src/lib/image_loader.ts", // custom img loader
    },
};

export default nextConfig;

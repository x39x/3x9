import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm"; //ISSUE: https://github.com/vercel/next.js/issues/71819#issuecomment-2496155399
import remarkMath from "remark-math";

const options = {
    parseFrontmatter: true,
    mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
            rehypeKatex,
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: {
                        dark: "github-dark",
                        light: "github-light",
                    },
                    keepBackground: false,
                },
            ],
        ],
    },
};

export default options;

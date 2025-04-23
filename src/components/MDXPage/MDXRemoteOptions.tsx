import remarkGfm from "remark-gfm"; //NOTE: https://github.com/vercel/next.js/issues/71819#issuecomment-2496155399
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const options = {
    parseFrontmatter: true,
    mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
            rehypeKatex,
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

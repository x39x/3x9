import React from "react";
import Img from "./Img";
import MDXCodeBlock from "./MDXCodeBlock";
import MDXTaskList from "./MDXTaskList";
import MDXImage from "./MDXImage";
import Link from "next/link";

import type { MDXComponents } from "mdx/types";

interface MDXOptions {
    id?: string;
}

const CreateMDXComponents = (options: MDXOptions = {}): MDXComponents => {
    const { id } = options;
    return {
        h1: (props) => <h1 className="my-9 text-4xl font-medium" {...props} />,
        h2: (props) => <h2 className="my-4 text-2xl font-medium" {...props} />,
        h3: (props) => <h3 className="my-4 font-bold" {...props} />,
        h4: (props) => <h4 className="my-2 text-sm font-bold" {...props} />,
        h5: (props) => <h5 className="my-2 text-sm font-bold" {...props} />,
        h6: (props) => <h6 className="my-2 text-sm font-bold" {...props} />,

        p: (props) => <p className="text-justify leading-8 my-8" {...props} />,
        hr: (props) => (
            <hr
                className="border-t my-20 border-[#D2D2D7] dark:border-[#2E2E2E]"
                {...props}
            />
        ),
        strong: (props) => <strong className="font-bold" {...props} />,
        a: (props) => (
            <Link
                className="hover:underline underline-offset-4 decoration-2 text-[#0066cc] dark:text-[#2897FF] "
                target="_blank"
                rel="noopener noreferrer nofollow"
                {...props}
            />
        ),

        ol: (props) => <ol className="list-decimal pl-5 my-8" {...props} />,
        ul: (props) => <ul className="list-disc pl-5 my-8" {...props} />,
        li: (props) => {
            if (props.className === "task-list-item") {
                return <MDXTaskList>{props.children}</MDXTaskList>;
            }
            return <li className="ml-3 my-2" {...props} />;
        },

        blockquote: (props) => (
            <blockquote
                className="pl-6 border-l-4 my-6 border-gray-200 text-gray-500 dark:border-[#333333] dark:text-[#999999] "
                {...props}
            />
        ),

        table: (props) => (
            <div className="my-6 w-full overflow-x-auto ">
                <table
                    className="w-full shadow-lg rounded-lg py-1"
                    {...props}
                />
            </div>
        ),
        tr: (props) => <tr className="" {...props} />,
        th: (props) => (
            <th className=" font-bold text-center py-7" {...props} />
        ),
        td: (props) => (
            <td
                className="py-6 text-center border-t border-gray-200 dark:border-[#292929] "
                {...props}
            />
        ),

        code: (props) => (
            <code
                className="bg-gray-100 dark:bg-[#333336] rounded px-[0.3rem] py-[0.2rem] font-mono"
                {...props}
            />
        ),
        pre: (props) => <MDXCodeBlock className="" {...props} />,

        img: (props) => <MDXImage id={id || ""} {...props} />,
        Img,
    };
};

export default CreateMDXComponents;

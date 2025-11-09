import MDXCodeBlock from "./MDXCodeBlock";
import MDXTaskList from "./MDXTaskList";
import MDXImage from "./MDXImage";
import Link from "next/link";
import Image from "next/image";
import BgmCard from "@/components/MediaGallery/BangumiCard";
import JostDate from "@/components/JostDate";

import type { MDXComponents } from "mdx/types";
import clsx from "clsx";

interface MDXOptions {
    page_id?: string;
}

const CreateMDXComponents = (options: MDXOptions = {}): MDXComponents => {
    const { page_id } = options;
    return {
        h1: (props) => {
            const id = props.id;
            return (
                <h1
                    id={id}
                    className="group mt-17 mb-9 text-4xl font-medium scroll-mt-24"
                >
                    {id && <Link href={`#${id}`}>{props.children}</Link>}
                </h1>
            );
        },
        h2: (props) => {
            const id = props.id;
            return (
                <h1 id={id} className="mt-12 mb-8 text-2xl font-medium">
                    {id && <Link href={`#${id}`}>{props.children}</Link>}
                </h1>
            );
        },
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
                className={clsx(
                    "hover:underline underline-offset-4 decoration-2",
                    "text-[#0066cc] dark:text-[#2897FF]",
                    "hover:transition-colors hover:duration-300",
                )}
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
            <th
                className="font-bold py-7 pl-6 text-left whitespace-nowrap "
                {...props}
            />
        ),

        td: (props) => (
            <td
                className="py-6 pl-6  border-t border-gray-200 dark:border-[#292929] "
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

        img: (props) => <MDXImage id={page_id || ""} {...props} />,
        Image,
        BgmCard: (props) => <BgmCard id={page_id || ""} {...props} />,
        JostDate,
    };
};

export default CreateMDXComponents;

import ContentContainer from "@/components/ContentContainer";
import { MDXRemote } from "next-mdx-remote-client/rsc";

import createMDXComponets from "./MDXComponents";
import options from "./MDXRemoteOptions";
import NotFound from "@/components/404";
import MDXCover from "./MDXCover";

interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    metadata: any;
    content: string;
}

const MDXPage = ({ post }: { post: Post }) => {
    if (!post) {
        return (
            <ContentContainer>
                <NotFound />
            </ContentContainer>
        );
    }
    const { content, title, date, id, metadata } = post;
    const MDXComponents = createMDXComponets({ id });

    return (
        <>
            <ContentContainer>
                <MDXCover
                    title={title}
                    date={new Date(date)}
                    updated_date={metadata.updated}
                    cover_url={metadata.cover_url}
                    reading_time={metadata.reading_time}
                    word_count={metadata.word_count}
                />
                <article>
                    <MDXRemote
                        source={content}
                        components={MDXComponents}
                        options={options as any}
                    />
                </article>
            </ContentContainer>
            <div className="relative max-w-184 w-full px-12 md:px-22 lg:px-0 m-auto mt-18 mb-15 ">
                <hr className="border-t border-[#CECECF] dark:border-[#2E2E2E]" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#141414] px-2 text-[0.7rem] text-gray-500">
                    end
                </span>
            </div>
        </>
    );
};

export default MDXPage;

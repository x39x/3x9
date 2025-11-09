import ContentContainer from "@/components/ContentContainer";
import { MDXRemote } from "next-mdx-remote-client/rsc";

import createMDXComponets from "./AnimeMDXComponents";
import options from "./MDXRemoteOptions";
import NotFound from "@/components/404";
import BgmCard from "@/components/MediaGallery/BangumiCard";

import { format } from "date-fns";
import { Jost } from "next/font/google";
import clsx from "clsx";
const JostFont = Jost({
    subsets: ["latin"],
});

interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    metadata: any;
    content: string;
}

const AnimeMDXPage = ({ post }: { post: Post }) => {
    if (!post) {
        return (
            <ContentContainer>
                <NotFound />
            </ContentContainer>
        );
    }
    const { content, title, id, metadata } = post;
    const MDXComponents = createMDXComponets({ id });

    return (
        <>
            <ContentContainer>
                <div className="my-11">
                    <div className="text-3xl font-medium">
                        我们不可能成为恋人！绝对不行
                    </div>
                    <span
                        className={clsx(
                            "mt-1 space-x-2 text-xs text-[#6E6E73] dark:text-[#868686] ",
                            JostFont.className,
                        )}
                    >
                        {format("2025-2-2", "MMMM do yyyy")}
                        {/* dot: • · */}
                        <span className="mx-2 text-xl select-none">·</span>
                        {metadata.reading_time}
                        <span className="mx-2 text-xl select-none">·</span>
                        {metadata.word_count} words
                    </span>
                </div>
                <BgmCard
                    id={title}
                    imgSrc={metadata.cover_url}
                    bangumiID={metadata.bgmID || ""}
                />

                <article className="mt-14">
                    <MDXRemote
                        source={content}
                        components={MDXComponents}
                        options={options as any}
                    />
                </article>
            </ContentContainer>
        </>
    );
};

export default AnimeMDXPage;

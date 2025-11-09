import ContentContainer from "@/components/ContentContainer";
import { MDXRemote } from "next-mdx-remote-client/rsc";

import createMDXComponets from "@/components/MDXPage/MDXComponents";
import options from "@/components/MDXPage/MDXRemoteOptions";
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
    content: string;
    slug: string;
    cover_url: string;
    date: string;
    metadata: any;
}

const AnimeMDXPage = ({ post }: { post: Post }) => {
    if (!post) {
        return (
            <ContentContainer>
                <NotFound />
            </ContentContainer>
        );
    }
    const {
        id,
        title,
        content,
        date,
        cover_url,
        metadata: {
            updated = "",
            bgmID = "",
            reading_time = "N/A",
            word_count = "N/A",
        } = {},
    } = post;

    const MDXComponents = createMDXComponets({ page_id: id });

    return (
        <ContentContainer>
            <div className="my-11">
                <div className="text-3xl font-medium">{title}</div>
                <span
                    className={clsx(
                        "mt-1 space-x-2 text-xs text-[#6E6E73] dark:text-[#868686] ",
                        JostFont.className,
                    )}
                >
                    {format(date, "MMMM do yyyy")}
                    <span className="mx-2 text-xl select-none">·</span>
                    {reading_time}
                    <span className="mx-2 text-xl select-none">·</span>
                    {word_count} words
                    {updated && (
                        <>
                            <span className="mx-2 text-xl select-none">·</span>
                            {"Updated " + format(updated, "MMMM do yyyy")}
                        </>
                    )}
                </span>
            </div>
            {bgmID && <BgmCard id={id} imgSrc={cover_url} bgmID={bgmID} />}

            <article className="mt-14 text-sm">
                <MDXRemote
                    source={content}
                    components={MDXComponents}
                    options={options as any}
                />
            </article>
        </ContentContainer>
    );
};

export default AnimeMDXPage;

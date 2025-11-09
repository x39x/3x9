import { MDXRemote } from "next-mdx-remote-client/rsc";
import ContentContainer from "@/components/ContentContainer";
import NotFound from "@/components/404";
import createMDXComponets from "./MDXComponents";
import options from "./MDXRemoteOptions";
import MDXCover from "./MDXCover";

interface Post {
    id: string;
    title: string;
    slug: string;
    cover_url: string;
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
    const { id, title, date, cover_url, content, metadata } = post;
    const MDXComponents = createMDXComponets({ page_id: id });

    return (
        <ContentContainer>
            <MDXCover
                title={title}
                date={new Date(date)}
                cover_url={cover_url}
                updated_date={metadata.updated}
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
    );
};

export default MDXPage;

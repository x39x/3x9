import { MDXRemote } from "next-mdx-remote-client/rsc";
import ContentContainer from "@/components/ContentContainer";
import NotFound from "@/components/404";
import createMDXComponents from "./MDXComponents";
import options from "./MDXRemoteOptions";
import MDXCover from "./MDXCover";
import { PostData } from "@/type/base";

const MDXPage = ({ post }: { post: PostData }) => {
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
        date,
        cover_url,
        content,
        updated_date,
        reading_time,
        word_count,
    } = post;
    const MDXComponents =  createMDXComponents({ page_id: id });

    return (
        <ContentContainer>
            <MDXCover
                title={title}
                date={date}
                cover_url={cover_url}
                word_count={word_count}
                reading_time={reading_time}
                updated_date={updated_date}
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

import React from "react";
import { format } from "date-fns";
import { getPostdata, PostData } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";
import { Tangerine } from "next/font/google";

const TangerineFont = Tangerine({
    weight: "400",
    subsets: ["latin"],
});
export default async function PostList() {
    const posts: PostData[] = await getPostdata("thoughts");

    if (posts.length === 0) {
        return (
            <ContentContainer>
                <div className="pt-10">There are no posts yet...</div>
            </ContentContainer>
        );
    }
    const sorted_posts = posts.sort(
        (a, b) =>
            new Date(b.metadata.date).getTime() -
            new Date(a.metadata.date).getTime(),
    );

    return (
        <ContentContainer className="mb-15 mt-19">
            {sorted_posts.map((post) => (
                <div key={post.id} className="mb-33">
                    <div className="text-sm leading-8 tracking-wide text-justify">
                        {post.title}
                    </div>
                    <div
                        className={`text-[#808080] text-right text-[1.2em]  mt-3 tracking-wide ${TangerineFont.className.trim()}`}
                    >
                        {format(post.metadata.date, "MMMM do yyyy")}
                    </div>
                </div>
            ))}
        </ContentContainer>
    );
}

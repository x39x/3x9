import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getPostdata } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";

import { Jost } from "next/font/google";
const JostFont = Jost({ subsets: ["latin"] });

export default async function PostList() {
    const posts = await getPostdata("blog");

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
        <ContentContainer className="mb-15 mt-11">
            {sorted_posts.map((post) => {
                return (
                    <div key={post.id} className="mb-18 ">
                        <Link prefetch={false} href={`/blog/${post.slug}`}>
                            <div className="text-[1.1em] ">{post.title}</div>
                        </Link>
                        <div
                            className={`mt-3 text-[#808080] text-[0.8em] ${JostFont.className}`}
                        >
                            {format(post.metadata.date, "MMMM do yyyy")}
                        </div>
                    </div>
                );
            })}
        </ContentContainer>
    );
}

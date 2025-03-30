import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Meddon } from "next/font/google";
import { getPostdata } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";

const meddon = Meddon({
    weight: "400",
    subsets: ["latin"],
});

export default async function PostList() {
    const posts = await getPostdata("wiki");

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
                        <Link prefetch={false} href={`/wiki/${post.slug}`}>
                            <div className="text-[1.1em] hover:underline decoration-1 ">
                                {post.title}
                            </div>
                        </Link>
                        <div
                            className={`mt-3 text-[#808080] text-[0.8em] ${meddon.className}`}
                        >
                            {format(post.metadata.date, "MMMM do yyyy")}
                        </div>
                    </div>
                );
            })}
        </ContentContainer>
    );
}

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getPostdata, PostData } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";

import { Jost } from "next/font/google";
const JostFont = Jost({ subsets: ["latin"] });

export default async function PostList() {
    const posts: PostData[] = await getPostdata("wiki");

    if (posts.length === 0) {
        return (
            <ContentContainer>
                <div className="pt-10">There are no posts yet...</div>
            </ContentContainer>
        );
    }

    const categorizedPosts: Record<string, PostData[]> = posts.reduce(
        (acc: Record<string, PostData[]>, post) => {
            const tags =
                typeof post.metadata.tag === "string"
                    ? post.metadata.tag.split(" ")
                    : Array.isArray(post.metadata.tag)
                      ? post.metadata.tag
                      : ["Unclassified"];
            tags.forEach((tag) => {
                if (!acc[tag]) acc[tag] = [];
                acc[tag].push(post);
            });
            return acc;
        },
        {},
    );

    return (
        <ContentContainer className="mb-15 mt-11">
            {Object.entries(categorizedPosts).map(([tag, posts]) => (
                <div key={tag} className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">{tag}</h2>
                    {posts.map((post) => (
                        <div key={post.id} className="mb-10 ">
                            <Link prefetch={false} href={`/wiki/${post.slug}`}>
                                <div className="flex justify-between items-start text-[0.95em]">
                                    <div className="flex items-baseline gap-3 min-w-0">
                                        <span
                                            className={`text-[#808080] w-[120px] shrink-0 ${JostFont.className}`}
                                        >
                                            {format(
                                                post.metadata.date,
                                                "MMMM do yyyy",
                                            )}
                                        </span>
                                        <span className="text-[1em] truncate">
                                            {post.title}
                                        </span>
                                    </div>
                                    <div
                                        className={`hidden sm:block text-[#808080] text-[0.8em] ${JostFont.className}`}
                                    >
                                        {post.metadata.word_count} words ·{" "}
                                        {post.metadata.reading_time}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    <div className="my-20"></div>
                </div>
            ))}
        </ContentContainer>
    );
}

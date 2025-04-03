import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Meddon } from "next/font/google";
import { getPostdata, PostData } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";

const meddon = Meddon({
    weight: "400",
    subsets: ["latin"],
});

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
                        <div key={post.id} className="mb-10">
                            <Link prefetch={false} href={`/wiki/${post.slug}`}>
                                <div className="text-[1.1em]">{post.title}</div>
                            </Link>
                            <div
                                className={`mt-1 text-[#808080] text-[0.8em] ${meddon.className}`}
                            >
                                {format(post.metadata.date, "MMMM do yyyy")}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </ContentContainer>
    );
}

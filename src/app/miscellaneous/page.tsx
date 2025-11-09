import Link from "next/link";
import { format } from "date-fns";
import { getPostdata } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";
import { Jost } from "next/font/google";
import type { Metadata } from "next";
import clsx from "clsx";

const JostFont = Jost({ subsets: ["latin"] });

export default async function PostList() {
    const posts = await getPostdata("misc");

    if (posts.length === 0) {
        return (
            <ContentContainer>
                <div className="pt-10">There are no posts yet...</div>
            </ContentContainer>
        );
    }
    const sorted_posts = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return (
        <ContentContainer className="mb-15 mt-11">
            {sorted_posts.map((post) => {
                return (
                    <div
                        key={post.id}
                        className={clsx(
                            "mb-21 md:flex group cursor-pointer",
                            " hover:text-[#0066CC]  dark:hover:text-[#2997FF] transition-colors duration-200",
                        )}
                    >
                        <Link
                            prefetch={false}
                            href={`/miscellaneous/${post.slug}`}
                            className="flex-1"
                        >
                            <div className="tracking-wide text-sm content-center">
                                {post.title}
                            </div>
                        </Link>
                        <div
                            className={clsx(
                                "text-xs tracking-wide text-[#6E6E73] dark:text-[#868686]",
                                "content-center ml-auto md:mt-0 mt-3",
                                JostFont.className,
                            )}
                        >
                            {format(post.date, "MMMM do yyyy")}
                        </div>
                    </div>
                );
            })}
        </ContentContainer>
    );
}

export const metadata: Metadata = {
    title: "松TvT | Miscellaneous",
};

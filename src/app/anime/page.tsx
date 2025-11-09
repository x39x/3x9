import { format } from "date-fns";
import clsx from "clsx";
import Link from "next/link";
import { Jost } from "next/font/google";
import type { Metadata } from "next";
import { getPostdata } from "@/lib/get_post";
import ContentContainer from "@/components/ContentContainer";

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

    // 先按时间排序
    const sorted_posts = posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // 按年份分组
    const postsByYear = sorted_posts.reduce(
        (acc, post) => {
            const year = format(new Date(post.date), "yyyy");
            if (!acc[year]) acc[year] = [];
            acc[year].push(post);
            return acc;
        },
        {} as Record<string, typeof posts>,
    );

    // 年份排序
    const years = Object.keys(postsByYear).sort(
        (a, b) => Number(b) - Number(a),
    );

    return (
        <ContentContainer className="mt-11">
            {years.map((year) => (
                <div key={year} className="mb-13 text-sm">
                    {/* 标题 */}
                    <div className="mb-4 text-[#6E6E73] dark:text-[#868686]">
                        {year}
                    </div>

                    {/* post 列表 */}
                    {postsByYear[year].map((post) => (
                        <Link
                            key={post.id}
                            prefetch={false}
                            href={`/anime/${post.slug}`}
                            className={clsx(
                                "flex mb-3 gap-3 truncate",
                                "hover:transition-colors hover:duration-300",
                                "hover:text-[#0066CC]  dark:hover:text-[#2997FF]",
                            )}
                        >
                            <div className="tracking-wider content-center">
                                {post.title}
                            </div>
                            <div
                                className={clsx(
                                    JostFont.className,
                                    "content-center",
                                    "text-xs tracking-wide text-[#6E6E73] dark:text-[#868686]",
                                )}
                            >
                                {format(new Date(post.date), "MMMM do")}
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </ContentContainer>
    );
}

export const metadata: Metadata = {
    title: "松TvT | 追番记录",
};

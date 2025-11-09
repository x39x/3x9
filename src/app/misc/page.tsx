import ContentContainer from "@/components/ContentContainer";
import AnimeCarousel from "@/components/MediaGallery/AnimeCarousel";
import Thoughts from "@/components/Thoughts";

import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import clsx from "clsx";
const Josefin_Font = Josefin_Sans({ weight: "400", subsets: ["latin"] });

// 标题
const Head = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={clsx(
            "text-2xl font-medium",
            className?.trim(),
            Josefin_Font.className.trim(),
        )}
    >
        {children}
    </div>
);

export default function Misc() {
    return (
        <ContentContainer className="mb-15 mt-9">
            <Head className="mb-5">Now</Head>
            <div className="text-sm ml-4">混吃等死ing</div>

            <Link href="/anime" className="cursor-pointer">
                <Head className="mb-9 mt-20">Recently Watched</Head>
            </Link>
            <AnimeCarousel />

            <Head className="mb-9 mt-23">Thoughts</Head>
            <Thoughts />
        </ContentContainer>
    );
}

//NOTE: <div className="[&>p]:m-0">

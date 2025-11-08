import ContentContainer from "@/components/ContentContainer";
import MediaCarousel from "@/components/MediaGallery/MediaCarousel";
import Thoughts from "@/components/Thoughts";
import rencentlyAnime from "@/../content/misc/data/recently_anime.json";

import { Josefin_Sans } from "next/font/google";

const Josefin_Font = Josefin_Sans({ weight: "400", subsets: ["latin"] });
const Head = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`text-2xl font-medium ${Josefin_Font.className.trim()} ${className?.trim() || ""}`}
    >
        {children}
    </div>
);

export default function Misc() {
    return (
        <ContentContainer className="mb-15 mt-9">
            <Head className="mb-5">Now</Head>
            <div className="text-sm ml-4">混吃等死ing</div>

            <Head className="mb-7 mt-20">Recently Watched</Head>
            <MediaCarousel data={rencentlyAnime} />

            <Head className="mb-9 mt-20">Thoughts</Head>
            <Thoughts />
        </ContentContainer>
    );
}

//NOTE: <div className="[&>p]:m-0">

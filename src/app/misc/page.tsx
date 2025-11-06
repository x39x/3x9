import ContentContainer from "@/components/ContentContainer";
import MediaCarousel from "@/components/MediaGallery/MediaCarousel";
import Thoughts from "@/components/Thoughts";
import rencentlyAnime from "@/../content/misc/data/recently_anime.json";

export default function Misc() {
    return (
        <ContentContainer className="mb-15 mt-9">
            <h1 className="text-2xl font-medium mb-9">Now</h1>
            <div className="text-sm ml-4">混吃等死ing</div>

            <h1 className="text-2xl font-medium mb-13 mt-20">
                Recently Watched
            </h1>
            <MediaCarousel data={rencentlyAnime} />

            <h1 className="text-2xl font-medium mb-14 mt-20">Thoughts</h1>
            <Thoughts />
        </ContentContainer>
    );
}

//NOTE: <div className="[&>p]:m-0">

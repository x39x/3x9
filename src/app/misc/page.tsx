import ContentContainer from "@/components/ContentContainer";
import MediaGallery from "@/components/MediaGallery";
import Thoughts from "@/components/Thoughts";
import anime from "@/../content/nodate/data/recently_anime.json";
export default function Misc() {
    return (
        <ContentContainer className="mb-15 mt-9">
            <h1 className="text-2xl font-medium my-7">Now</h1>
            <div className="text-sm ml-4">混吃等死ing</div>
            <h1 className="text-2xl font-medium my-7">Recently Watched</h1>
            <MediaGallery data={anime} />

            <h1 className="text-2xl font-medium mb-14 mt-8">Thoughts</h1>
            <Thoughts />
        </ContentContainer>
    );
}

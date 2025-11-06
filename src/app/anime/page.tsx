import ContentContainer from "@/components/ContentContainer";
import MediaGallery from "@/components/MediaGallery";
import BgmCard from "@/components/MediaGallery/BangumiCard";
import anime from "@/../content/nodate/data/recently_anime.json";

export default function Misc() {
    return (
        <ContentContainer className="mb-15 mt-19">
            <h1 className="text-2xl font-medium my-7">Recently Watched</h1>
            <MediaGallery data={anime} />

            <h1 className="font-medium text-2xl my-5">Recently Read</h1>
            <BgmCard bangumiID="2566" imgSrc="/c.jpg" />
            <BgmCard bangumiID="235130" imgSrc="/a.jpg" />
            <BgmCard bangumiID="515880" imgSrc="/f.jpg" />
            <BgmCard bangumiID="507634" imgSrc="/a.jpg" />
            <BgmCard bangumiID="498378" imgSrc="/b.jpg" />
        </ContentContainer>
    );
}

//TODO: <div className="[&>p]:m-0">

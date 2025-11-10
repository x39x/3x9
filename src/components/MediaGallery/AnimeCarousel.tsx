import { getPostdata } from "@/lib/get_post";
import bgmdata from "@/../content/misc/data/bangumi_subject.json";
import MediaCarousel from "@/components/MediaGallery/MediaCarousel";
import { MediaCardProps } from "@/type/media_gallery";

const posts = await getPostdata("misc", "anime");

const animeCardMap: Record<string, MediaCardProps> = {};

for (const post of posts) {
    const key = post.metadata?.bgmID;
    if (!key) continue; // 跳过没有 bgmID 的
    animeCardMap[key] = {
        href: `/anime/${post.slug}`,
        title: post.title,
        comment: post.metadata.summary || "",
        rating: post.metadata.rating || 0,
        date: post.metadata.updated_date || post.date,
        imgSrc: post.cover_url,
    };
}

const animeCards = Object.entries(animeCardMap)
    .map(([bgmID, card]) => ({ bgmID, ...card }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8) // 取最新的8个
    .map(({ bgmID, ...card }) => {
        const bgmData = (bgmdata as any)[bgmID];
        const fallbackImg =
            bgmData?.images?.large || bgmData?.images?.common || card.imgSrc;

        const invalid =
            !card.imgSrc ||
            card.imgSrc === "" ||
            card.imgSrc === "/39img/content-default_cover.jpeg";

        return {
            ...card,
            imgSrc: invalid ? fallbackImg : card.imgSrc,
        };
    });

const AnimeCarousel = () => {
    return <MediaCarousel data={animeCards} />;
};

export default AnimeCarousel;

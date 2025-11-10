import { getPostdata } from "@/lib/get_post";
import bgmdata from "@/../content/misc/data/bangumi_subject.json";
import MediaCarousel from "@/components/MediaGallery/MediaCarousel";
import { MediaCardProps } from "@/type/media_gallery";
import { BgmJSONSaved } from "@/type/bangumi";

const posts = await getPostdata("misc", "anime");

const anime_list_map: Record<string, MediaCardProps> = {};

// 从 post 中提取需要用到的数据，以 bangumi id 为key，整理成 map
for (const post of posts) {
    const bgm_id = post?.bgmid;
    if (!bgm_id) continue; // 跳过没有 bgmID 的
    anime_list_map[bgm_id] = {
        href: `/anime/${post.slug}`,
        title: post.title,
        comment: post.description || "",
        rating: post.rating || 0,
        date: post.updated_date || post.date,
        cover_url: post.cover_url,
    };
}

//处理 cover_url ，合并 bangumi_id ，整理成可以传给 MediaCarousel 的数组
const a_list = Object.entries(anime_list_map)
    .map(([bgmID, card]) => {
        const bgmData = (bgmdata as BgmJSONSaved)[bgmID];
        const fallbackImg = bgmData?.images?.large || bgmData?.images?.common;

        const isInvalidImg =
            !card.cover_url ||
            card.cover_url === "" ||
            card.cover_url === "/39img/content-default_cover.jpeg";

        return {
            bgmID,
            ...card,
            date: new Date(card.date),
            cover_url: isInvalidImg
                ? fallbackImg || card.cover_url
                : card.cover_url,
        };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 8);

const AnimeCarousel = () => {
    return <MediaCarousel data={a_list} />;
};

export default AnimeCarousel;

import MediaWideCard from "@/components/MediaGallery/MediaWideCard";
import bgmdata from "@/../content/misc/data/bangumi_subject.json";
import Link from "next/link";

// Tag 类型
interface TagItem {
    name: string;
    count: number;
}

// Bangumi 数据结构
interface BangumiInfo {
    date: string;
    summary: string;
    name: string;
    score?: number;
    tags: TagItem[];
}

//  bgmdata 的整体类型
const dataMap = bgmdata as Record<string, BangumiInfo>;

// 组件 props
interface BgmCardProps {
    id?: string;
    bangumiID: string;
    imgSrc?: string;
}

const BgmCard: React.FC<BgmCardProps> = ({
    id = "",
    bangumiID,
    imgSrc = "/a.jpg",
}) => {
    let data = dataMap[bangumiID];
    if (!data) {
        data = dataMap["2045"];
    }

    // 直接在MDX文件中使用时处理本地图片
    const img_src = imgSrc.startsWith("./")
        ? `/39img/${id}${imgSrc.replace("./", "-")}`
        : imgSrc;

    // 取 count 最高的前 8 个标签
    const topTags = Array.isArray(data.tags)
        ? data.tags
            .sort((a, b) => b.count - a.count)
            .slice(0, 8)
            .map((tag) => tag.name)
            .join(" / ")
        : "";

    return (
        <Link
            target="_blank"
            rel="noopener noreferrer"
            href={"https://bgm.tv/subject/" + bangumiID}
        >
            <MediaWideCard
                title={data.name}
                tags={topTags}
                description={data.summary}
                airDate={data.date}
                coverImage={img_src}
            />
        </Link>
    );
};

export default BgmCard;

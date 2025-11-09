import Link from "next/link";
import MediaWideCard from "@/components/MediaGallery/MediaWideCard";
import bgmdata from "@/../content/misc/data/bangumi_subject.json";

// Tag 类型
interface TagItem {
    name: string;
    count: number;
}

interface BangumiImages {
    small?: string;
    grid?: string;
    large?: string;
    medium?: string;
    common?: string;
}

// Bangumi 数据结构

interface BangumiInfo {
    date: string;
    summary: string;
    name: string;
    images: BangumiImages;
    score?: number;
    tags: TagItem[];
}

//  bgmdata 的整体类型
const dataMap = bgmdata as Record<string, BangumiInfo>;

// 组件 props
interface BgmCardProps {
    id?: string;
    bgmID: string;
    imgSrc?: string;
}

const BgmCard = ({ id = "", bgmID, imgSrc = "" }: BgmCardProps) => {
    //TODO: fetch
    let data = dataMap[bgmID];
    if (!data) {
        data = dataMap["2045"];
    }

    let img_src = "";
    if (imgSrc.startsWith("./")) {
        // 直接在MDX文件中使用时处理本地图片
        img_src = `/39img/${id}${imgSrc.replace("./", "-")}`;
    } else {
        img_src = imgSrc;
    }

    // 没准备图片从 bangumi 获取
    if (img_src == "" || img_src == "/39img/content-default_cover.jpeg") {
        img_src = data.images?.large || data.images?.common || "";
    }

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
            href={"https://bgm.tv/subject/" + bgmID}
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

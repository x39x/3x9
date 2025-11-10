import Link from "next/link";

import bgmdata from "@/../content/misc/data/bangumi_subject.json";
import MediaIntro from "@/components/MediaGallery/MediaIntro";
import { BgmIntroProps, BgmSubjectSaved } from "@/type/bangumi";

const dataMap = bgmdata as Record<string, BgmSubjectSaved>;

const BgmIntro = ({ id, bgmid, cover_url = "" }: BgmIntroProps) => {
    const data = dataMap[bgmid] || dataMap["2045"];

    let img_addr;
    if (cover_url.startsWith("./")) {
        // 直接在MDX文件中使用时处理本地图片
        img_addr = `/39img/${id}${cover_url.replace("./", "-")}`;
    } else {
        img_addr = cover_url || "";
    }

    // 没准备图片从 bangumi 获取
    if (!img_addr || img_addr === "/39img/content-default_cover.jpeg") {
        img_addr = data?.images?.large ?? data?.images?.common ?? "";
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
            href={"https://bgm.tv/subject/" + bgmid}
        >
            <MediaIntro
                title={data.name}
                tags={topTags}
                description={data.summary}
                airDate={data.date}
                coverImage={img_addr}
            />
        </Link>
    );
};

export default BgmIntro;

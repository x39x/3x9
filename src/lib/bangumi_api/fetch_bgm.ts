import { BgmSubjectApi } from "@/type/bangumi";
import { filterTags } from "./filter_tags";

// 请求API
export async function fetchBgm(id: string) {
    try {
        const res = await fetch(`https://api.bgm.tv/v0/subjects/${id}`);
        if (!res.ok) {
            console.error(`ERROR (${id}): ${res.status} ${res.statusText}`);
            return null;
        }

        const json: BgmSubjectApi = await res.json();

        const extracted = {
            date: json.date,
            summary: (json.summary ?? "")
                .replace(/[\r\n\t\\]+/g, " ")
                .replace(/\s+/g, " ")
                .trim(),
            name: json.name,
            name_cn: json.name_cn,
            images: json.images,
            score: json.rating?.score,
            tags: filterTags(json.tags || []),
        };

        // 去掉空值
        const valid = Object.fromEntries(
            Object.entries(extracted).filter(
                ([_, v]) =>
                    v !== null &&
                    v !== undefined &&
                    v !== "" &&
                    !(Array.isArray(v) && v.length === 0),
            ),
        );

        return Object.keys(valid).length > 0 ? valid : null;
    } catch (err) {
        console.error(`ID ${id} ERROR:`, err);
        return null;
    }
}

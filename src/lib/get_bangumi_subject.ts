import fs from "fs";
import path from "path";
import { BgmSubjectApi, BgmJSONSaved, BgmTagItem } from "@/type/bangumi";

const IDS_FILE = path.join(
    process.cwd(),
    "content",
    "misc",
    "data",
    "bangumi_id.json",
);
const DATA_FILE = path.join(
    process.cwd(),
    "content",
    "misc",
    "data",
    "bangumi_subject.json",
);

// 延迟
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 读取 JSON
function loadJson<T>(file: string): T | null {
    if (!fs.existsSync(file)) return null;
    try {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    } catch {
        console.warn(`ERROR: ${file}`);
        return null;
    }
}

// 写入 JSON
function saveJson(file: string, data: any) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4), "utf-8");
}

// 过滤 tags
const aliasMap: Record<string, string> = {
    徳: "德",
    髙: "高",
    﨑: "崎",
};

function normalizeName(name: string): string {
    return name
        .normalize("NFKC") // 统一全角、半角、兼容字符
        .split("")
        .map((ch) => aliasMap[ch] ?? ch) // 替换异体字
        .join("")
        .replace(/\s+/g, "") // 去掉空白
        .trim();
}

export function filterTags(
    tags: BgmTagItem[],
): { name: string; count: number }[] {
    if (!Array.isArray(tags)) return [];

    // 1️⃣ 过滤无效标签
    const filtered = tags.filter((t) => {
        if (!t.name) return false;

        // 过滤掉“TV”、“日本”
        if (t.name === "TV" || t.name === "日本") return false;

        // 过滤掉以“20”开头的年份类标签
        if (/^20\d{2}/.test(t.name)) return false;

        // 过滤掉阿拉伯数字或汉字数字的“月”结尾标签
        if (/(1[0-2]|0?[1-9])月$/.test(t.name)) return false;
        if (/(一|二|三|四|五|六|七|八|九|十|十一|十二)月$/.test(t.name))
            return false;

        return true;
    });

    // 2️⃣ 合并同类标签
    const mergedMap = new Map<string, BgmTagItem>();

    for (const t of filtered) {
        let name = t.name;
        // 合并中日异体字
        name = normalizeName(name);

        // 漫改
        if (/(漫画改|漫改)/.test(name)) {
            name = "漫改";
        }
        // 轻改
        else if (/(小说改|轻小说改|轻改)/.test(name)) {
            name = "轻改";
        }

        //  去重， count 取较大的
        const existing = mergedMap.get(name);
        if (!existing || t.count > existing.count) {
            mergedMap.set(name, { ...t, name });
        }
    }

    // 3️⃣ 排序取前 20
    const top20 = Array.from(mergedMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 20)
        .map(({ name, count }) => ({ name, count }));

    return top20;
}

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

// 读取 id 列表
const idsObj = loadJson<Record<string, string>>(IDS_FILE);
if (!idsObj) {
    console.error("Can't find ids.json");
    process.exit(1);
}

const ids = Object.keys(idsObj);
console.log(`抓取 ${ids.length} 个条目...\n`);

// 读取旧数据
const saved = loadJson<BgmJSONSaved>(DATA_FILE) || {};

//  清理掉不在 ids 里的
for (const id of Object.keys(saved)) {
    if (!ids.includes(id)) {
        delete saved[id];
    }
}

// 逐个抓取
for (const id of ids) {
    console.log("fetch ID:", id, idsObj[id] || "");
    const data = await fetchBgm(id.toString());
    if (data) {
        saved[id] = { ...(saved[id] || {}), ...data };
        console.log("saved", data.name_cn, "\n");
    } else {
        console.log("skip ", id);
    }
    await sleep(800);
}

saveJson(DATA_FILE, saved);
console.log(`\n已保存 ${DATA_FILE}`);

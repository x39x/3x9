import fs from "fs";
import path from "path";

import { getPostdata } from "@/lib/get_post";
import { BgmJSONSaved, BgmSubjectSaved, BgmImages } from "@/type/bangumi";

import { fetchBgm } from "./fetch_bgm";

const SAVED_FILE = path.join(process.cwd(), "content", "misc", "data", "bangumi_subject.json");

const BUFAN_FILE = path.join(process.cwd(), "content", "misc", "anime", "bufan", "index.mdx");

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

const IDS: string[] = [];

// 从 bufan.mdx 收集 bgmid
function bufanIDS() {
    const content = fs.readFileSync(BUFAN_FILE, "utf-8");
    const regex = /^\s*<BgmCard\b[^>]*\bbgmid="([^"]+)"[^>]*\/>\s*$/gm;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
        IDS.push(match[1]);
    }
}
bufanIDS();

// 从 post 中提取 bgm_id
const posts = await getPostdata("misc", "anime");
for (const post of posts) {
    const bgmId = post?.bgmid;
    if (!bgmId) continue; // 跳过没有 bgmID 的
    // postBgmId[bgmId] = post.title;
    IDS.push(bgmId.toString());
}

// load saved bgm JSON， 清理掉未出现的
const saved = loadJson<BgmJSONSaved>(SAVED_FILE) || {};
for (const id of Object.keys(saved)) {
    if (!IDS.includes(id)) {
        delete saved[id];
    }
}

const defaultImages: BgmImages = {
    small: "https://x39x.cc/404.png",
    grid: "https://x39x.cc/404.png",
    large: "https://x39x.cc/404.png",
    medium: "https://x39x.cc/404.png",
    common: "https://x39x.cc/404.png",
};

const normalizeSubject = (data: Partial<BgmSubjectSaved>): BgmSubjectSaved => ({
    name: data.name ?? "unknown",
    name_cn: data.name_cn ?? "未知",
    date: data.date ?? "1939-03-09",
    summary: data.summary ?? "",
    images: {
        ...defaultImages,
        ...(data.images ?? {}),
    },
    score: data.score ?? 0,
    tags: data.tags ?? [],
});

// 逐个抓取
console.log(`抓取 ${IDS.length} 个条目...\n`);
for (const id of IDS) {
    console.log("fetch ID:", id);
    const data = await fetchBgm(id.toString());

    if (data) {
        saved[id] = normalizeSubject({
            ...saved[id],
            ...data,
        });

        console.log("saved", saved[id].name_cn, "\n");
    } else {
        console.log("skip: ", id);
    }
}

fs.writeFileSync(SAVED_FILE, JSON.stringify(saved, null, 4), "utf-8");
console.log(`\n已保存 ${SAVED_FILE}`);

import fs from "fs";
import path from "path";
import { BgmJSONSaved } from "@/type/bangumi";
import { getPostdata } from "@/lib/get_post";
import { fetchBgm } from "./fetch_bgm";

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

// 读取 bangumi id json
const existingIds = loadJson<Record<string, string>>(IDS_FILE);
if (!existingIds) {
    console.error("无法找到文件:", IDS_FILE);
    process.exit(1);
}

// 从 post 中提取 bgm_id
const posts = await getPostdata("misc", "anime");
const postBgmId: Record<string, string> = {};
for (const post of posts) {
    const bgmId = post?.bgmid;
    if (!bgmId) continue; // 跳过没有 bgmID 的
    postBgmId[bgmId] = post.title;
}

// 合并
const mergedIdMap: Record<string, string> = {
    ...existingIds,
    ...postBgmId,
};

const ids = Object.keys(mergedIdMap);

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
    console.log("fetch ID:", id, mergedIdMap[id] || "");
    const data = await fetchBgm(id.toString());
    if (data) {
        saved[id] = { ...(saved[id] || {}), ...data };
        console.log("saved", data.name_cn, "\n");
    } else {
        console.log("skip ", id);
    }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(saved, null, 4), "utf-8");
console.log(`\n已保存 ${DATA_FILE}`);

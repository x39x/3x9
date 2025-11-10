import { BgmTagItem } from "@/type/bangumi";

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

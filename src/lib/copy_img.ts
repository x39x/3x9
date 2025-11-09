// 有图片的文件夹路径不得包括'-','-' 作为 id 时将会替换 '/'

import fs from "fs-extra";
import path from "path";
import { globSync } from "glob";
import { ImageMapping } from "@/interfaces";

const contentDir = path.resolve(process.cwd(), "content");
const imgDir = path.resolve(process.cwd(), "public", "39img");
const mapFile = path.resolve(process.cwd(), "content", "imgMap.json");

fs.ensureDirSync(imgDir);
fs.ensureFileSync(mapFile);

// === 加载或初始化映射 ===
function loadMapping(): ImageMapping {
    try {
        const data = fs.readFileSync(mapFile, "utf-8");
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

// === 保存映射（自动清理+排序）===
function saveMapping(mapping: ImageMapping): void {
    // 清理无效 key（没有对应图片）
    const cleaned: ImageMapping = {};
    for (const [key, value] of Object.entries(mapping)) {
        const imgPath = path.join(process.cwd(), key.replace(/-/g, "/"));
        if (fs.existsSync(imgPath)) {
            cleaned[key] = value;
        } else {
            console.log(`Removed missing file mapping: ${key}`);
        }
    }

    // 按 key 排序
    const sorted = Object.keys(cleaned)
        .sort((a, b) => a.localeCompare(b))
        .reduce<ImageMapping>((acc, key) => {
            acc[key] = cleaned[key];
            return acc;
        }, {});

    fs.writeFileSync(mapFile, JSON.stringify(sorted, null, 4), "utf-8");
}

// === 获取所有图片文件 ===
function getImageFiles(): string[] {
    return globSync("**/*.{png,jpg,jpeg,webp}", {
        cwd: contentDir,
        nodir: true,
        ignore: "**/node_modules/**",
        // caseInsensitiveMatch: true,
    });
}

// === 生成新文件名 ===
function generateNewFileName(relPath: string): string {
    const parsed = path.parse(relPath);
    const dirPart = parsed.dir.replace(/[\\/]/g, "-");
    const ext = parsed.ext.toLowerCase();
    return dirPart
        ? `content-${dirPart}-${parsed.name}${ext}`
        : `content-${parsed.name}${ext}`;
}

// === 复制文件并更新映射 ===
function copyImages(): void {
    const imageFiles = getImageFiles();
    const mapping = loadMapping();

    for (const relPath of imageFiles) {
        const newFileName = generateNewFileName(relPath);
        const src = path.join(contentDir, relPath);
        const dest = path.join(imgDir, newFileName);

        // 如果 key 不存在，初始化为空字符串
        if (!Object.prototype.hasOwnProperty.call(mapping, newFileName)) {
            mapping[newFileName] = "";
        }

        // 如果 key 已经有图床url，跳过复制
        if (mapping[newFileName]) {
            console.log(`Skipped (already mapped): ${newFileName}`);
            continue;
        }

        fs.copyFileSync(src, dest);
        console.log(`Copied: ${src} -> ${dest}`);
    }

    saveMapping(mapping);
    console.log("All images processed and mapping updated.");
}

fs.emptyDirSync(imgDir);
copyImages();

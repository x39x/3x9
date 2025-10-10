// import fs from "fs-extra";
// import path from "path";
// import { globSync } from "glob";
//
// // dir imgDir
// const contentDir = path.resolve(process.cwd(), "content");
// const imgDir = path.resolve(process.cwd(), "public", "39img");
// fs.ensureDirSync(imgDir);
// fs.emptyDirSync(imgDir);
//
// // get all img
// const imageFiles = globSync("**/*.{png,jpg,jpeg}", {
//     cwd: contentDir,
//     nodir: true,
//     ignore: "**/node_modules/**",
//     caseInsensitiveMatch: true,
// });
//
// imageFiles.forEach((relPath) => {
//     const parsed = path.parse(relPath);
//     // 替换路径分隔符并处理扩展名小写
//     const dirPart = parsed.dir.replace(/[\\/]/g, "-");
//     const ext = parsed.ext.toLowerCase();
//     const newFileName = dirPart
//         ? `content-${dirPart}-${parsed.name}${ext}`
//         : `content-${parsed.name}${ext}`;
//
//     const src = path.join(contentDir, relPath);
//     const dest = path.join(imgDir, newFileName);
//
//     fs.copyFileSync(src, dest);
//     console.log(`Copied: ${src} -> ${dest}`);
// });
//
// console.log("ALL IMG COPIED");

import fs from "fs-extra";
import path from "path";
import { globSync } from "glob";

const contentDir = path.resolve(process.cwd(), "content");
const imgDir = path.resolve(process.cwd(), "content");
const mapFile = path.resolve(imgDir, "imgMap.json");

fs.ensureDirSync(imgDir);
fs.ensureFileSync(mapFile);

// load img mapping
function loadMapping() {
    try {
        const data = fs.readFileSync(mapFile, "utf-8");
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function saveMapping(mapping) {
    fs.writeFileSync(mapFile, JSON.stringify(mapping, null, 2), "utf-8");
}

function getImageFiles() {
    return globSync("**/*.{png,jpg,jpeg}", {
        cwd: contentDir,
        nodir: true,
        ignore: "**/node_modules/**",
        caseInsensitiveMatch: true,
    });
}

function generateNewFileNmae(relPath) {
    const parsed = path.parse(relPath);
    const dirPart = parsed.dir.replace(/[\\/]/g, "-");
    const ext = parsed.ext.toLowerCase();
    return dirPart
        ? `content-${dirPart}-${parsed.name}${ext}`
        : `content-${parsed.name}${ext}`;
}

function copyImages() {
    const imageFiles = getImageFiles();
    const mapping = loadMapping();
    for (const relPath of imageFiles) {
        const newFileName = generateNewFileNmae(relPath);
        const src = path.join(contentDir, relPath);
        const dest = path.join(imgDir, newFileName);
        if (!mapping[newFileName]) {
            mapping[newFileName] = "";
        }
        // 如果存在链接 -> skip
        if (mapping[newFileName]) {
            continue;
        }
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${src} -> ${dest}`);
    }
    saveMapping(mapping);
    console.log("All images processed and mapping updated.");
}

fs.ensureDirSync(imgDir);
fs.emptydirSync(imgDir);
copyImages();

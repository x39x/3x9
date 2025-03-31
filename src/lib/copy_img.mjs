import fs from "fs-extra";
import path from "path";
import { globSync } from "glob";

// dir imgDir
const contentDir = path.resolve(process.cwd(), "content");
const imgDir = path.resolve(process.cwd(), "public", "39img");
fs.ensureDirSync(imgDir);

// get all img
const imageFiles = globSync("**/*.{png,jpg,jpeg}", {
    cwd: contentDir,
    nodir: true,
    ignore: "**/node_modules/**",
    caseInsensitiveMatch: true,
});

imageFiles.forEach((relPath) => {
    const parsed = path.parse(relPath);
    // 替换路径分隔符并处理扩展名小写
    const dirPart = parsed.dir.replace(/[\\/]/g, "-");
    const ext = parsed.ext.toLowerCase();
    const newFileName = dirPart
        ? `content-${dirPart}-${parsed.name}${ext}`
        : `content-${parsed.name}${ext}`;

    const src = path.join(contentDir, relPath);
    const dest = path.join(imgDir, newFileName);

    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
});

console.log("ALL IMG COPYED");

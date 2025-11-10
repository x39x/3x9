import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import readingTime from "reading-time";
import { PostData } from "@/type/base";

// 获取文章背景图片
function getCoverUrl(dir: string, id: string): string {
    const defaultImgUrl = "/39img/content-default_cover.jpeg";
    const extensions = ["jpg", "png", "jpeg", "webp"];
    const imagePathBase = dir + path.sep + "cover";
    // 可能会有不同的后缀
    for (const ext of extensions) {
        const filePath = `${imagePathBase}.${ext}`;
        if (fs.existsSync(filePath)) {
            return `/39img/${id}-cover.${ext}`;
        }
    }
    return defaultImgUrl;
}

// 获取文章、添加属性
async function getPostFromDir(dir: string): Promise<PostData | null> {
    // find index.mdx
    const index_path = path.join(dir, "index.mdx");
    if (!fs.existsSync(index_path)) return null;

    // read index.mdx and process it with grayMatter
    const fileContents = await fs.promises.readFile(index_path, "utf8");
    const { data, content } = grayMatter(fileContents);

    // 计算文章阅读时间
    const { text: reading_time, words: word_count } = readingTime(content);
    // 用路径当作文章 id ，处理图片
    const post_id = dir
        .replace(process.cwd() + path.sep, "")
        .split(path.sep)
        .join("-");
    // 文章 cover 图路径
    const cover_url = getCoverUrl(dir, post_id);
    // 合并
    Object.assign(data, { reading_time, word_count });

    return {
        id: post_id,
        title: data.title || "untitled",
        slug: encodeURIComponent(data.slug || post_id),
        date: data.date || "2039-03-09",
        metadata: data,
        content,
        cover_url,
    };
}

async function getAllPosts(dir: string): Promise<PostData[]> {
    // 获取目录下的所有文件
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    let posts: PostData[] = [];

    for (const entry of entries) {
        // 当前完整路径
        const fullPath = path.join(dir, entry.name);
        //只处理文件夹
        if (entry.isDirectory()) {
            const post = await getPostFromDir(fullPath);
            if (post) posts.push(post);
            //递归处理所有子目录
            posts = posts.concat(await getAllPosts(fullPath));
        }
    }

    return posts;
}

export async function getPostdata(...dir: string[]): Promise<PostData[]> {
    const directory = path.join(process.cwd(), "content", ...dir);
    const posts = await getAllPosts(directory);
    return posts;
}

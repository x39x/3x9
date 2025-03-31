import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import readingTime from "reading-time";

function getCoverUrl(dir: string, id: string): string {
    const defaultImgUrl = "/default_cover.jpg";
    const extensions = ["jpg", "png", "jpeg"];
    const imagePathBase = dir + path.sep + "cover";

    for (const ext of extensions) {
        const filePath = `${imagePathBase}.${ext}`;
        if (fs.existsSync(filePath)) {
            return `/39img/${id}-cover.${ext}`;
        }
    }
    return defaultImgUrl;
}

export type PostData = {
    id: string;
    slug?: string;
    title?: string;
    content: string;
    metadata: { [key: string]: any };
};

async function getPostFromDir(dir: string): Promise<PostData | null> {
    const index_path = path.join(dir, "index.mdx");
    if (!fs.existsSync(index_path)) return null;

    const fileContents = await fs.promises.readFile(index_path, "utf8");
    const { data, content } = grayMatter(fileContents);

    const { text: reading_time, words: word_count } = readingTime(content);
    const post_id = dir
        .replace(process.cwd() + path.sep, "")
        .split(path.sep)
        .join("-");
    const cover_url = getCoverUrl(dir, post_id);
    Object.assign(data, { reading_time, word_count, cover_url });

    return {
        id: post_id,
        metadata: data,
        title: data.title,
        slug: data.slug,
        content,
    };
}

async function getAllPosts(dir: string): Promise<PostData[]> {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    let posts: PostData[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const post = await getPostFromDir(fullPath);
            if (post) posts.push(post);
            posts = posts.concat(await getAllPosts(fullPath));
        }
    }

    return posts;
}

export async function getPostdata(dir: string): Promise<PostData[]> {
    const directory = path.join(process.cwd(), "content", dir);
    const posts = await getAllPosts(directory);
    return posts;
}

import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import readingTime from "reading-time";

export type PostData = {
    id: string;
    slug?: string;
    title?: string;
    content: string;
    metadata: { [key: string]: any };
};

async function getPostFromDir(dir: string): Promise<PostData | null> {
    const indexPath = path.join(dir, "index.mdx");
    if (!fs.existsSync(indexPath)) return null;

    const fileContents = await fs.promises.readFile(indexPath, "utf8");
    const { data, content } = grayMatter(fileContents);
    const { text: reading_time, words: word_count } = readingTime(content);
    Object.assign(data, { reading_time, word_count });

    return {
        id: dir
            .replace(process.cwd() + path.sep, "")
            .split(path.sep)
            .join("-"),
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

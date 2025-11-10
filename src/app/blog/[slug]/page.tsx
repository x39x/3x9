import { getPostdata } from "@/lib/get_post";
import MDXPage from "@/components/MDXPage";
import { PostPageProps } from "@/type/base";

export async function generateStaticParams() {
    const posts = await getPostdata("blog");
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("blog");
    const post = posts.find((post) => post.slug === slug);

    return {
        title: post?.metadata.title,
        description: post?.metadata.description,
        keywords: post?.metadata.keywords,
    };
}

export default async function Page({ params }: PostPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("blog");
    const post = posts.find((post) => post.slug === slug);
    return <MDXPage post={post as any} />;
}

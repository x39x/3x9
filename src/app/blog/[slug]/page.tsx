import { getPostdata } from "@/lib/get_post";
import MDXPage from "@/components/MDXPage";
import { PostPageProps } from "@/type/base";
import imageMap from "@/../content/imgMap.json";

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

    // get real cover address
    const cover_id =
        post?.cover_url.replace(/^\/39img\//, "") ||
        "content-default_cover.jpeg";
    const mapped_url = (imageMap as Record<string, string>)[cover_id];

    return {
        title: post?.title,
        description: post?.description,
        openGraph: {
            title: post?.title,
            description: post?.description,
            images: [mapped_url || post?.cover_url],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post?.title,
            description: post?.description,
            images: [mapped_url || post?.cover_url],
        },
    };
}

export default async function Page({ params }: PostPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("blog");
    const post = posts.find((post) => post.slug === slug);
    return <MDXPage post={post as any} />;
}

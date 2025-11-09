import { getPostdata } from "@/lib/get_post";
import AnimeMDXPage from "@/components/AnimeMDXPage";

type MiscellaneousPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const posts = await getPostdata("misc");
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: MiscellaneousPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("misc");
    const post = posts.find((post) => post.slug === slug);

    return {
        title: post?.title,
        description: post?.metadata.description,
        keywords: post?.metadata.keywords,
    };
}

export default async function Page({ params }: MiscellaneousPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("misc");
    const post = posts.find((post) => post.slug === slug);
    return <AnimeMDXPage post={post as any} />;
}

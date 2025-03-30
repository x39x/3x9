import React from "react";
import { getPostdata } from "@/lib/get_post";
import MDXPage from "@/components/MDXPage";

type BlogPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const posts = await getPostdata("wiki");
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("wiki");
    const post = posts.find((post) => post.slug === slug);

    return {
        title: post?.metadata.title,
        description: post?.metadata.description,
        keywords: post?.metadata.keywords,
    };
}

export default async function Page({ params }: BlogPageProps) {
    const { slug } = await params;
    const posts = await getPostdata("wiki");
    const post = posts.find((post) => post.slug === slug);

    return <MDXPage post={post as any} />;
}

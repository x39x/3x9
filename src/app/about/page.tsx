import AboutBody from "@/components/About";
import type { Metadata } from "next";
import type { Viewport } from "next";

export default function About() {
    return <AboutBody />;
}

export const metadata: Metadata = {
    title: "松TvT | About Matsu",
};

export const viewport: Viewport = {
    themeColor: "#39c5bb",
};

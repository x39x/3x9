import LayoutBody from "@/components/LayoutBody";
import type { Metadata } from "next";
import "@/app/globals.css";
import "katex/dist/katex.min.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-Hans">
            <LayoutBody>{children}</LayoutBody>
        </html>
    );
}

export const metadata: Metadata = {
    title: "松TvT",
};

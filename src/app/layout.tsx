import type { Metadata } from "next";

import LayoutBody from "@/components/LayoutBody";

import "@/app/globals.css";
import "katex/dist/katex.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh-Hans" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function () {
                            try {
                            const html = document.documentElement;

                            html.classList.remove('light', 'dark');

                            html.classList.add(
                            window.matchMedia('(prefers-color-scheme: dark)').matches
                            ? 'dark'
                            : 'light'
                            );
                            } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <LayoutBody>{children}</LayoutBody>
        </html>
    );
}

export const metadata: Metadata = {
    title: "松TvT",
    openGraph: {
        images: ["https://x39x.cc/home.webp"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://x39x.cc/home.webp"],
    },
};

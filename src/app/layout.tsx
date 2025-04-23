import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import "@/app/globals.css";
import "katex/dist/katex.min.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh">
            <body className="bg-white dark:bg-[#141414] text-black dark:text-[#F5F5F7] min-h-screen">
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    <main className="flex-1">{children}</main>
                </div>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: "Matsu's blog",
    description: "Matsu's blog",
    other: {
        //  Pinterest
        "p:domain_verify": "5acdddf64c4ffe8885542f6ba917e409",
    },
};

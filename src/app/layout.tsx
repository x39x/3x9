import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import "@/app/globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
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
};

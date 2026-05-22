"use client";
import clsx from "clsx";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const LayoutBody = ({ children }: { children: React.ReactNode }) => {
    const pathname = `/${usePathname()?.split("/")[1]}`;
    return (
        <body>
            <ThemeProvider defaultTheme="system" scriptProps={{ "data-cfasync": "false" }}>
                <div
                    className={clsx(
                        pathname == "/about"
                            ? "bg-[#39C5BB] text-white"
                            : "bg-white dark:bg-[#141414] text-black dark:text-[#F5F5F7]",
                        "min-h-screen text-autospace flex flex-col",
                    )}
                >
                    <NavBar />
                    <main className="flex-1">{children}</main>
                    {!["/about", "/"].includes(pathname) && <Footer />}
                </div>
            </ThemeProvider>
        </body>
    );
};

export default LayoutBody;

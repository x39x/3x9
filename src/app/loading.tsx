"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
export default function Loading() {
    const pathname = `/${usePathname()?.split("/")[1]}`;
    return (
        <div
            className={clsx(
                pathname == "/about"
                    ? "bg-[#39C5BB] text-white"
                    : "bg-white dark:bg-[#141414] text-black dark:text-[#F5F5F7]",
                "min-h-screen flex items-center justify-center",
            )}
        ></div>
    );
}

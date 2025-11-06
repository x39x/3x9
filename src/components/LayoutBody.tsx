"use client";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";

const LayoutBody = ({ children }: { children: React.ReactNode }) => {
    const pathname = `/${usePathname()?.split("/")[1]}`;
    return (
        <body
            className={`${pathname == "/about" ? "bg-[#39C5BB] text-white" : "bg-white dark:bg-[#141414] text-black dark:text-[#F5F5F7] "} min-h-screen text-autospace`}
        >
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-1">{children}</main>
            </div>
        </body>
    );
};

export default LayoutBody;

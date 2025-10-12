"use client";
import Link from "next/link";
import ThemeToggle from "./ToogleTheme";
import Hamburger from "./Hamburger";
import { usePathname } from "next/navigation";

interface NavLinksProps {
    links: {
        href: string;
        text: string;
    }[];
}

const NavLinks = ({ links }: NavLinksProps) => {
    return (
        <>
            {links.map((link) => {
                // 判断是否是外部链接（以 http:// 或 https:// 开头）
                const isExternal =
                    link.href.startsWith("http://") ||
                    link.href.startsWith("https://");

                if (isExternal) {
                    // 外部链接
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block"
                        >
                            {link.text}
                        </a>
                    );
                } else {
                    // 站内链接：使用 Next.js <Link>
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            prefetch={true}
                            className="hidden sm:block"
                        >
                            {link.text}
                        </Link>
                    );
                }
            })}
        </>
    );
};

export default function NavBar() {
    const pathname = `/${usePathname()?.split("/")[1]}`;
    return (
        <header
            className={`sticky top-0 z-50 flex justify-center items-center h-14 w-full ${pathname == "/about" ? "bg-transparent" : "bg-white/75 dark:bg-[#141414]/75 backdrop-blur-xl"}`}
        >
            <div className="flex justify-between items-center w-full lg:max-w-[55rem] md:max-w-[43rem] text-[0.9rem] font-medium">
                <div className="flex items-center pl-6 space-x-8 ">
                    <Link prefetch={false} href={"/"}>
                        Home
                    </Link>
                </div>
                <div className="flex items-center justify-center space-x-8 pr-6 ">
                    <NavLinks
                        links={[
                            { href: "/thoughts", text: "Thoughts" },
                            { href: "/blog", text: "Blog" },
                            { href: "https://wiki.x39x.cc", text: "Wiki" },
                            { href: "/about", text: "About" },
                        ]}
                    />
                    <ThemeToggle />
                </div>
                <Hamburger />
            </div>
        </header>
    );
}

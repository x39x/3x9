"use client";
import Link from "next/link";
import ThemeToggle from "./ToogleTheme";
import Hamburger from "./Hamburger";
import { usePathname } from "next/navigation";
import { Josefin_Sans } from "next/font/google";
import clsx from "clsx";

const Josefin_Font = Josefin_Sans({
    weight: "400",
    subsets: ["latin"],
});

interface NavLink {
    href: string;
    text: string;
}

interface NavLinksProps {
    links: NavLink[];
}

const NavLinks = ({ links }: NavLinksProps) => {
    const pathname = `/${usePathname()?.split("/")[1] || ""}`;
    const isAbout = pathname === "/about";
    return (
        <>
            {links.map(({ href, text }) => {
                const isExternal = /^https?:\/\//.test(href);
                const baseClasses = clsx(
                    "hidden sm:block transition-transform duration-300",
                    !isAbout &&
                    "hover:text-[#0066CC]  dark:hover:text-[#2997FF] hover:transition-colors hover:duration-300",
                );
                return isExternal ? (
                    <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={baseClasses}
                    >
                        {text}
                    </a>
                ) : (
                    <Link
                        key={href}
                        href={href}
                        prefetch
                        className={baseClasses}
                    >
                        {text}
                    </Link>
                );
            })}
        </>
    );
};

export default function NavBar() {
    const navLinks: NavLink[] = [
        { href: "/misc", text: "Misc" },
        { href: "/blog", text: "Blog" },
        { href: "https://wiki.x39x.cc", text: "Wiki" },
        { href: "/about", text: "About" },
    ];
    const pathname = `/${usePathname()?.split("/")[1] || ""}`;
    const isAbout = pathname === "/about";

    return (
        <header
            className={clsx(
                "sticky top-0 z-50 flex justify-center items-center h-14 w-full backdrop-blur-xl",
                isAbout ? "bg-transparent" : "bg-white/75 dark:bg-[#141414]/75",
            )}
        >
            <nav
                className={`flex justify-between items-center w-full lg:max-w-220 md:max-w-173 text-[0.9rem] ${Josefin_Font.className}`}
            >
                {/* Home */}
                <div className="flex items-center pl-6 space-x-8">
                    <Link
                        href="/"
                        prefetch={false}
                        className={clsx(
                            "hover:transition-colors hover:duration-300",
                            !isAbout &&
                            "hover:text-[#0066CC]  dark:hover:text-[#2997FF]",
                        )}
                    >
                        Home
                    </Link>
                </div>

                {/* 导航 + 主题切换 */}
                <div className="flex items-center justify-center  space-x-8 pr-6">
                    <NavLinks links={navLinks} />
                    <ThemeToggle />
                </div>

                {/* 移动端菜单 */}
                <Hamburger />
            </nav>
        </header>
    );
}

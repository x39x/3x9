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

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
    return links.map((link) => (
        <Link
            prefetch={false}
            key={link.href}
            href={link.href}
            className="hidden sm:block"
        >
            {link.text}
        </Link>
    ));
};

export default function NavBar() {
    const pathname = `/${usePathname()?.split("/")[1]}`;
    return (
        <header
            className={`sticky top-0 z-50 flex justify-center items-center h-14 w-full ${pathname == "/about" ? "bg-transparent" : "bg-white/75 dark:bg-[#141414]/75 backdrop-blur-xl"}`}
        >
            <div className="flex justify-between items-center w-full lg:max-w-[55rem] md:max-w-[43rem] text-[0.9rem]">
                <div className="flex items-center pl-6 space-x-8 ">
                    <Link prefetch={false} href={"/"} className="font-medium">
                        Home
                    </Link>
                </div>
                <div className="flex items-center justify-center space-x-8 pr-6">
                    <NavLinks
                        links={[
                            { href: "/blog", text: "Blog" },
                            { href: "/wiki", text: "Wiki" },
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

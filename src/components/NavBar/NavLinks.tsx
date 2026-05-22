"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLinksProps } from "@/type/base";

const NavLinks = ({ links }: NavLinksProps) => {
    const pathname = `/${usePathname()?.split("/")[1] || ""}`;
    const isAbout = pathname === "/about";
    return (
        <>
            {links.map(({ href, text }) => {
                const isExternal = /^https?:\/\//.test(href);
                const baseClasses = clsx(
                    "hidden sm:flex items-center justify-center transition-transform duration-300",
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
                    <Link key={href} href={href} prefetch={false} className={baseClasses}>
                        {text}
                    </Link>
                );
            })}
        </>
    );
};

export default NavLinks;

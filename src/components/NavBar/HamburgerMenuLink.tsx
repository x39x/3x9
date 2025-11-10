import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Josefin_Sans } from "next/font/google";
import { HamburgerMenuLinkProps } from "@/type/base";

const Josefin_Font = Josefin_Sans({
    weight: "400",
    subsets: ["latin"],
});

const HamburgerMenuLink = (props: HamburgerMenuLinkProps) => {
    const pathname = `/${usePathname()?.split("/")[1]}`;
    const handleLinkClick = (href: string, pathname: string) => {
        if (pathname === href) {
            props.setIsOpen(false);
        }
    };

    return props.links.map((link) => (
        <Link
            key={link.href}
            href={link.href}
            className={clsx(
                Josefin_Font.className.trim(),
                "text-lg",
                link.href == pathname &&
                "underline underline-offset-5 decoration-3",
            )}
            onClick={() => handleLinkClick(link.href, pathname)}
        >
            {link.text}
        </Link>
    ));
};

export default HamburgerMenuLink;

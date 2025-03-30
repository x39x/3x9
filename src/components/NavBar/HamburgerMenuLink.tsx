import { usePathname } from "next/navigation";
import Link from "next/link";
import localFont from "next/font/local";
type LinkProps = {
    setIsOpen: (isOpen: boolean) => void;
    links: {
        href: string;
        text: string;
    }[];
};

const FuturaBlod = localFont({
    src: "../../../public/FuturaBold.otf",
    display: "swap",
});

const HamburgerMenuLink = (props: LinkProps) => {
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
            className={`${FuturaBlod.className.trim()} text-lg ${link.href == pathname ? "underline underline-offset-5 decoration-3" : ""}`}
            onClick={() => handleLinkClick(link.href, pathname)}
        >
            {link.text}
        </Link>
    ));
};

export default HamburgerMenuLink;

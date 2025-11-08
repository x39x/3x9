"use client";
import ContentContainer from "@/components/ContentContainer";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import localFont from "next/font/local";
import { RemoveScroll } from "react-remove-scroll";
import clsx from "clsx";

const Futura = localFont({
    src: "../../public/FuturaMedium.otf",
    display: "swap",
});

const AboutBody = () => {
    return (
        <RemoveScroll>
            <ContentContainer>
                <div className="flex flex-col justify-center items-center space-y-3 mt-20 text-white">
                    <Avatar size={150} />
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/x39x"
                        className={clsx(
                            "ml-3 text-5xl",
                            "hover:underline underline-offset-9 decoration-4",
                            "transition-all duration-300",
                            Futura.className.trim(),
                        )}
                    >
                        Matsu
                    </Link>
                </div>
            </ContentContainer>
        </RemoveScroll>
    );
};
export default AboutBody;

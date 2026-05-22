"use client";
import clsx from "clsx";
import localFont from "next/font/local";
import Link from "next/link";
import { RemoveScroll } from "react-remove-scroll";

import Avatar from "@/components/Avatar";
import ContentContainer from "@/components/ContentContainer";

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

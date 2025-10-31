"use client";
import ContentContainer from "@/components/ContentContainer";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import localFont from "next/font/local";
import { RemoveScroll } from "react-remove-scroll";

const FuturaBold = localFont({
    src: "../../../public/FuturaBold.otf",
    display: "swap",
});

export default function About() {
    return (
        <RemoveScroll>
            <ContentContainer>
                <div className="flex flex-col justify-center items-center space-y-3 mt-20 text-white">
                    <Avatar size={150} />
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/x39x"
                        className={` ml-3 text-5xl  hover:underline underline-offset-9 decoration-3  ${FuturaBold.className.trim()}`}
                    >
                        Matsu
                    </Link>
                </div>
            </ContentContainer>
        </RemoveScroll>
    );
}

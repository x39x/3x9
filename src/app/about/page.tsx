"use client";
import ContentContainer from "@/components/ContentContainer";
import Avatar from "@/components/Avatar";
import { RemoveScroll } from "react-remove-scroll";
import Link from "next/link";
import Image from "next/image";
// import type { Metadata } from "next";
import localFont from "next/font/local";

const FuturaBold = localFont({
    src: "../../../public/FuturaBold.otf",
    display: "swap",
});

export default function About() {
    return (
        <RemoveScroll>
            <div className="absolute inset-0 -z-20 h-screen w-screen">
                <Image
                    src="/about.jpeg"
                    alt="Background"
                    fill={true}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            <div className="absolute inset-0  backdrop-blur-lg -z-10"></div>
            <ContentContainer>
                {/* blur */}

                <div className="flex flex-col justify-center items-center space-y-3 mt-20 text-white">
                    <Avatar size={150} />
                    <Link
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

// export const metadata: Metadata = {
//     title: "About Matsu",
//     description: "About Matsu",
// };

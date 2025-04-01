import ContentContainer from "@/components/ContentContainer";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";

const FuturaBold = localFont({
    src: "../../../public/FuturaBold.otf",
    display: "swap",
});

export default function About() {
    return (
        <ContentContainer>
            <div className="absolute inset-0 -z-10">
                <img
                    src="/about.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* blur */}
            <div className="absolute inset-0  backdrop-blur-lg -z-10"></div>

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
    );
}

export const metadata: Metadata = {
    title: "About Matsu",
    description: "About Matsu",
};

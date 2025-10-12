"use client";
import ContentContainer from "@/components/ContentContainer";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

const FuturaBold = localFont({
    src: "../../../public/FuturaBold.otf",
    display: "swap",
});

export default function About() {
    return (
        <>
            <div className="absolute inset-0 -z-20 h-screen w-screen">
                <Image
                    src="https://img.x39x.cc/large/008IpWfqgy1i68w2wa0q8j335s1s0k0m.jpg"
                    alt="Background"
                    fill={true}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>

            {/* blur */}
            <div
                className="absolute inset-0  backdrop-blur-lg -z-10 h-screen w-screen"
                style={{ willChange: "backdrop-filter" }}
            ></div>
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
        </>
    );
}

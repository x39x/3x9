"use client";
import ContentContainer from "@/components/ContentContainer";
import TypedText from "@/components/TypedText";
import Image from "next/image";
import { RemoveScroll } from "react-remove-scroll";

export default function Home() {
    const src = "/home.webp";
    return (
        <RemoveScroll>
            <ContentContainer>
                <div className="flex flex-col items-center justify-center w-full text-center min-h-[calc(100vh-9rem)] mt-5 lg:mt-3">
                    <Image
                        src={src}
                        alt="Avatar"
                        width={300}
                        height={500}
                        style={{ objectFit: "contain", width: "299px" }}
                        priority
                    />
                    <TypedText />
                </div>
            </ContentContainer>
        </RemoveScroll>
    );
}

import ContentContainer from "@/components/ContentContainer";
import TypedText from "@/components/TypedText";
import Image from "next/image";

export default function Home() {
    const src = "/home.webp";
    return (
        <ContentContainer>
            <div className="flex flex-col items-center justify-center w-full text-center min-h-[calc(100vh-9rem)] mt-5 lg:mt-0">
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
    );
}

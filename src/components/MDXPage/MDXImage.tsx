import React from "react";
import Image from "next/image";

interface CustomImageProps {
    id: string;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

const MDXImage: React.FC<CustomImageProps> = ({ id, src, alt = "" }) => {
    const img_src = src.startsWith("./")
        ? `/39img/${id}${src.replace("./", "-")}`
        : src;
    return (
        <Image
            className="w-[95%]  h-auto rounded mx-auto my-8"
            src={img_src}
            alt={alt}
            sizes="100vw"
            width={500}
            height={500}
        />
    );
};

export default MDXImage;

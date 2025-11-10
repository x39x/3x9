import Image from "next/image";
import { MDXImageProps } from "@/type/base";

const MDXImage = ({ id, src, alt }: MDXImageProps) => {
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

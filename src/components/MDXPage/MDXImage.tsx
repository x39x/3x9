import Image from "next/image";

import { MDXImageProps } from "@/type/base";

const MDXImage = ({ id, src, alt }: MDXImageProps) => {
    const img_src = src.startsWith("./") ? `/39img/${id}${src.replace("./", "-")}` : src;

    return (
        <Image
            src={img_src}
            alt={alt}
            width={0}
            height={0}
            sizes="95vw"
            className="mx-auto my-8 h-auto w-[95%] rounded"
            loading="lazy"
        />
    );
};

export default MDXImage;

import imageMap from "@/../imgMap.json";

type ImageLoaderProps = {
    src: string;
    width?: number;
    quality?: number;
};

const imageLoader = ({
    src,
    width = 500,
    quality = 75,
}: ImageLoaderProps): string => {
    const imgId = src.replace(/^\/39img\//, "");
    const mapped = (imageMap as Record<string, string>)[imgId];

    // 存在图床链接，直接返回，否则附加参数
    return mapped ?? `${src}?w=${width}&q=${quality}`;
};

export default imageLoader;

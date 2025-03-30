// const imageLoader = ({ src }) => src;

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
    return `${src}?w=${width}&q=${quality}`;
};

export default imageLoader;

import React from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt?: string;
};

const Img: React.FC<ImgProps> = ({ src, alt = "", ...props }) => (
    <img src={src} alt={alt} {...props} />
);

export default Img;

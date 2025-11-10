import Image from "next/image";

const Avatar = ({ size = 50 }: { size?: number }) => {
    const src = "/avatar.png";
    return (
        <div
            className="rounded-full overflow-hidden bg-transparent backdrop-blur-lg"
            style={{ width: size, height: size }}
        >
            <Image src={src} alt="Avatar" width={500} height={500} priority />
        </div>
    );
};

export default Avatar;

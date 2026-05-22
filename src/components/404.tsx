import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
const Josefin_Font = Josefin_Sans({
    weight: "400",
    subsets: ["latin"],
    style: "italic",
});

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full min-h-[calc(100vh-10rem)]">
            <Image
                src="/404.png"
                alt="404"
                width={500}
                height={500}
                className="w-[39%] md:w-[33%] mb-9"
            />
            <h1 className={`text-sm  ${Josefin_Font.className.trim()}`}>Not found</h1>
        </div>
    );
};

export default NotFound;

import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
const Josefin_Font = Josefin_Sans({
    weight: "300",
    subsets: ["latin"],
    style: "italic",
});

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full text-center min-h-[calc(100vh-10rem)]">
            <Image
                src="/404.png"
                alt="404 Not Found"
                width={500}
                height={500}
                className="lg:w-[34%] md:w-[40%] w-[65%]"
            />
            <h1 className={`mt-9 text-sm ${Josefin_Font.className.trim()}`}>
                Not found
            </h1>
        </div>
    );
};

export default NotFound;

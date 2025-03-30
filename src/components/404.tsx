import Image from "next/image";
import localFont from "next/font/local";
import { Meddon } from "next/font/google";

const MeddonFont = Meddon({
    weight: "400",
    subsets: ["latin"],
});

const FuturaBookFont = localFont({
    src: "../public/FuturaBook.otf",
    display: "swap",
});

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full text-center min-h-[calc(100vh-13rem)]">
            <Image
                src="/404.png"
                alt="404 Not Found"
                width={500}
                height={500}
                className="lg:w-[38%] md:w-[40%] w-[65%]"
            />
            <h1
                className={`mt-4 text-[1.2em] ${FuturaBookFont.className.trim()}`}
            >
                4 0 4
            </h1>
            <h1 className={`mt-2 text-[1.1em] ${MeddonFont.className.trim()}`}>
                Page not found
            </h1>
        </div>
    );
};

export default NotFound;

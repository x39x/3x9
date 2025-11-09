import Link from "next/link";
import clsx from "clsx";
const currentYear = new Date().getFullYear();
const Footer = () => (
    <footer
        className={clsx(
            "text-[#6A6A6A] dark:text-[#B5B5B5] ",
            "max-w-183 w-full m-auto mb-2 mt-3",
            "sm:flex px-12 md:px-22 lg:px-0 ",
            "justify-between  text-[0.7em]",
        )}
    >
        <div className="sm:flex gap-2 items-center">
            <div className="">
                Copyright © 2023 - {currentYear}
                <span className="text-[#1D1D1D] dark:text-[#EFEFEF] mx-1.5">
                    Matsu.
                </span>
                All rights reserved.
            </div>
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://icp.gov.moe/?keyword=20255239"
                className="hover:underline text-[0.93em]"
            >
                萌ICP备20255239号
            </Link>
        </div>

        <div className="flex gap-3 mt-2 sm:mt-0">
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:matsu3x9@icloud.com"
                className="hover:underline"
            >
                Email
            </Link>
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/x39x"
                className="hover:underline"
            >
                Github
            </Link>
        </div>
    </footer>
);

export default Footer;

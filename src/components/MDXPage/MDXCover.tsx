import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { getCoverUrl } from "@/lib/get_cover_url";

type Props = {
    id: string;
    title: string;
    date: Date;
    update_date: Date;
    reading_time: string;
    word_count: string;
};

const MDXCover: React.FC<Props> = ({
    id,
    title = "Tille Not Found",
    reading_time = "N/A",
    word_count = "N/A",
    date = new Date().getTime(),
    update_date,
}) => {
    const img_src: string = getCoverUrl(id);

    return (
        <div className="mt-4 ">
            <div className="overflow-hidden relative w-full rounded-md h-39 md:h-69 lg:h-80">
                <Image
                    src={img_src}
                    alt={title + "Page Cover"}
                    style={{ objectFit: "cover" }}
                    fill
                    priority
                />
            </div>
            <div className="mt-5 mb-11">
                <div className="text-4xl font-bold">{title}</div>
                <span className="mt-1 space-x-2 text-sm text-[#808080]">
                    {format(date, "MMMM do yyyy")}
                    <span className="mx-2 text-xl text-gray-500 select-none">
                        •
                    </span>
                    {reading_time}
                    <span className="mx-2 text-xl text-gray-500 select-none">
                        •
                    </span>
                    {word_count} words
                    {update_date && (
                        <>
                            <span className="mx-2 text-xl text-gray-500 select-none">
                                •
                            </span>
                            {"Updated " + format(update_date, "MMMM do yyyy")}
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default MDXCover;

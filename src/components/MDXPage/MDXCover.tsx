import React from "react";
import { format } from "date-fns";

type Props = {
    date: Date;
    updated_date: Date;
    title: string;
    cover_url: string;
    word_count: string;
    reading_time: string;
};

const MDXCover: React.FC<Props> = ({
    date = new Date().getTime(),
    updated_date,
    title = "Tille Not Found",
    cover_url,
    reading_time = "N/A",
    word_count = "N/A",
}) => {
    return (
        <div className="mt-4 ">
            <div className="overflow-hidden relative w-full rounded h-50 md:h-69 lg:h-80">
                <img
                    src={cover_url}
                    alt={title + " Page Cover"}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center" }}
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
                    {updated_date && (
                        <>
                            <span className="mx-2 text-xl text-gray-500 select-none">
                                •
                            </span>
                            {"Updated " + format(updated_date, "MMMM do yyyy")}
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default MDXCover;

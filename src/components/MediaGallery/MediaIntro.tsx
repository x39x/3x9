import clsx from "clsx";
import Image from "next/image";
import { format } from "date-fns";

import { MediaIntroProps } from "@/type/media_gallery";

const MediaIntro = ({
    descPrefix = "简介：",
    datePrefix = "放送：",
    title,
    tags,
    description,
    airDate,
    coverImage,
}: MediaIntroProps) => {
    return (
        <div className="h-58 flex items-end my-5">
            <div className="w-full h-44 rounded-sm flex relative group shadow-md dark:shadow-black/80">
                {/* 封面图 */}
                <div
                    className={clsx(
                        "absolute left-0 -top-19 w-[139px] h-[213px] ",
                        "m-5 overflow-hidden rounded-xs",
                        "shadow-2xl dark:shadow-black/80 ",
                        "transition-transform duration-300 group-hover:-rotate-3",
                        "group-hover:-rotate-3",
                    )}
                >
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

                {/* 信息部分 */}
                <div className="ml-45 h-34 flex flex-col overflow-hidden gap-2 mt-4">
                    {/* 标题 */}
                    <div className="text-sm font-medium truncate">{title}</div>

                    {/* 标签 */}
                    <div className="text-[0.7em] font-medium text-[#6E6E73] dark:text-[#86868B] truncate">
                        {tags}
                    </div>

                    {/* 简介 */}
                    <div className="text-xs h-16 overflow-hidden text-ellipsis line-clamp-4 text-justify leading-5 mr-5">
                        <b>{descPrefix}</b>
                        {description}
                    </div>

                    {/* 放送时间 */}
                    <div className="text-xs truncate flex font">
                        <div className="font-medium">{datePrefix}</div>
                        <div>{format(airDate, "yyyy-M-d")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaIntro;

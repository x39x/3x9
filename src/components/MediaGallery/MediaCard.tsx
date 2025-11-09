import Link from "next/link";
import Image from "next/image";
import RatingStars from "@/components/MediaGallery/Rating";
import { format } from "date-fns";
import clsx from "clsx";

export interface MediaCardProps {
    href: string;
    title: string;
    comment: string;
    rating: number;
    date: string;
    imgSrc: string;
}

const MediaCard = ({
    href,
    title,
    comment,
    rating,
    date,
    imgSrc,
}: MediaCardProps) => {
    return (
        <div className="relative shrink-0 w-[139px] h-[213px]">
            <Link href={href}>
                <div className="relative shrink-0 w-[139px] h-[213px] group/card">
                    {/* 悬浮遮罩层 */}
                    <div
                        className={clsx(
                            "bg-black/40",
                            "text-white text-xs",
                            "flex flex-col justify-between absolute z-10 rounded-sm",
                            "opacity-0 group-hover/card:opacity-100",
                            "backdrop-blur-none group-hover/card:backdrop-blur-md",
                            "transition-all duration-300",
                        )}
                        style={{ width: 139, height: 213 }}
                    >
                        <div className="w-28 m-auto mt-3 leading-5 max-h-36 overflow-hidden text-justify">
                            「 {comment ? comment : "暂无评价 >_<"} 」
                        </div>

                        <div>
                            <RatingStars rating={rating} />
                            <div className="w-28 m-auto mb-3">
                                {format(new Date(date), "yyyy年M月dd日")}
                            </div>
                        </div>
                    </div>

                    {/* 图片层 */}
                    <div
                        className="relative overflow-hidden rounded"
                        style={{ width: 139, height: 213 }}
                    >
                        <Image
                            src={imgSrc}
                            alt={title}
                            fill
                            className="transform transition-transform duration-300 group-hover/card:scale-105"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </Link>

            {/* 标题 */}
            <div className="text-xs mt-3 text-center font-bold truncate w-31 m-auto">
                {title}
            </div>
        </div>
    );
};

export default MediaCard;

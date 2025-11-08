"use client";
import { useRef, useState, useEffect } from "react";
import MediaCard, { MediaCardProps } from "./MediaCard";
import clsx from "clsx";

interface MediaCarouselProps {
    data: MediaCardProps[];
}

const MediaCarousel = ({ data }: MediaCarouselProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showRightFade, setShowRightFade] = useState(false);
    const [showLeftFade, setShowLeftFade] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const atLeftEnd = el.scrollLeft <= 5;
            const atRightEnd =
                el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
            setShowLeftFade(!atLeftEnd);
            setShowRightFade(!atRightEnd);
        };

        // 初始化时判断一次
        handleScroll();

        el.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            el.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <div className="relative group w-full px-3">
            <div
                ref={scrollRef}
                className="flex gap-5 w-full overflow-x-auto scrollbar-hide scroll-smooth h-61"
            >
                {[...data]
                    .sort(
                        (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime(),
                    )
                    .map((item, i) => (
                        <MediaCard key={i} {...item} />
                    ))}
            </div>

            {/* 滑动后左侧淡白渐变*/}
            {showLeftFade && (
                <div
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 h-full w-13",
                        "bg-linear-to-r from-white  dark:from-[#141414] to-transparent",
                        "transition-opacity duration-300",
                    )}
                />
            )}
            {/* 右侧淡白渐变，仅在未滑到最右时显示 */}
            {showRightFade && (
                <div
                    className={clsx(
                        "pointer-events-none absolute right-0 top-0 h-full w-15",
                        "bg-linear-to-l from-white dark:from-[#141414] to-transparent",
                        "transition-opacity duration-300",
                    )}
                />
            )}
        </div>
    );
};

export default MediaCarousel;

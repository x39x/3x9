"use client";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

import { MediaCardProps } from "@/type/media_gallery";
import MediaCard from "./MediaCard";

const MediaCarousel = ({ data }: { data: MediaCardProps[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showRightFade, setShowRightFade] = useState(false);
    const [showLeftFade, setShowLeftFade] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const atLeftEnd = el.scrollLeft <= 5;
            const atRightEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
            setShowLeftFade(!atLeftEnd);
            setShowRightFade(!atRightEnd);
        };

        handleScroll();

        const handleWheel = (e: WheelEvent) => {
            // 触控板 or Shift+滚轮
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) return;

            // 转换垂直滚动为横向滚动
            e.preventDefault();
            el.scrollBy({
                left: e.deltaY * 3.9, // 控制速度
                behavior: "auto",
            });
        };

        el.addEventListener("scroll", handleScroll);
        el.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("resize", handleScroll);

        return () => {
            el.removeEventListener("scroll", handleScroll);
            el.removeEventListener("wheel", handleWheel);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);
    return (
        <div className="relative group w-full px-3">
            <div
                ref={scrollRef}
                className="flex gap-5 w-full h-61 overflow-x-auto scrollbar-hide scroll-smooth overscroll-contain"
                style={{
                    scrollBehavior: "smooth", // 平滑滚动
                    scrollSnapType: "x mandatory", // 自动贴合
                    WebkitOverflowScrolling: "touch", // iOS 弹性滚动
                    overscrollBehaviorX: "contain", // 防止父级滚动
                }}
            >
                {[...data]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((item, i) => (
                        <MediaCard key={i} {...item} />
                    ))}
            </div>

            {/* 滑动后左侧淡白渐变*/}
            {showLeftFade && (
                <div
                    className={clsx(
                        "pointer-events-none absolute left-0 top-0 h-full w-5",
                        "bg-linear-to-r from-white  dark:from-[#141414] to-transparent",
                        "transition-opacity duration-300",
                    )}
                />
            )}
            {/* 右侧淡白渐变，仅在未滑到最右时显示 */}
            {showRightFade && (
                <div
                    className={clsx(
                        "pointer-events-none absolute right-0 top-0 h-full w-5",
                        "bg-linear-to-l from-white dark:from-[#141414] to-transparent",
                        "transition-opacity duration-300",
                    )}
                />
            )}
        </div>
    );
};

export default MediaCarousel;

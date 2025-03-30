"use client";
//TODO: remove client
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import localFont from "next/font/local";

const FuturaBlod = localFont({
    src: "../../public/FuturaBold.otf",
    display: "swap",
});
const poems = [
    ["醒亦念卿，梦亦念卿", "Vivamus, atque amemus"],
    ["Difficile est longum subito deponere amorem"],
    ["dies irae dies illa me necabis"],
    [
        "Vivamus, mea Lesbia, atque amemus",
        "rumoresque senum severiorum",
        "omnes unius aestimemus assis",
    ],
];

export default function TypedText() {
    const typedRef1 = useRef<HTMLSpanElement>(null);
    const [_, setIsTypedLoaded] = useState(false);

    useEffect(() => {
        const typed1 = new Typed(typedRef1.current, {
            strings: poems[0],
            typeSpeed: 200,
            backSpeed: 100,
            startDelay: 0,
            backDelay: 1000,
            loop: true,
            showCursor: true,
            shuffle: false,
            onBegin: () => setIsTypedLoaded(true),
        });

        return () => {
            typed1.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full text-center mt-6">
            <h1 className={`${FuturaBlod.className}`}>
                <span ref={typedRef1}>
                    {/* w-zero 'Space' 占位符 */}
                    {"\u200b"}
                </span>
            </h1>
            <h1 className={`mt-3 text-[1.1em] ${FuturaBlod.className}`}>
                Odi et amo. Quare id faciam, nescio. Sed fieri sentio et
                excrucior
            </h1>
        </div>
    );
}

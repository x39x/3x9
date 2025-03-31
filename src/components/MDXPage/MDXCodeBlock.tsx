"use client";
//BUG: https://github.com/rehype-pretty/rehype-pretty-code/issues/235
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";
import { Check, Code } from "lucide-react";

export default function MDXCodeBlock({
    children,
    ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
    const [isCopied, setIsCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const handleClickCopy = async () => {
        const code = preRef.current?.textContent;

        if (code) {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 500);
        }
    };

    return (
        <div className="relative">
            <pre
                ref={preRef}
                {...props}
                className="px-8 pb-2 pt-5 my-8 rounded-md shadow-md dark:shadow-black/80 overflow-x-auto"
            >
                <div className="mt-5">{children}</div>
            </pre>
            <button
                disabled={isCopied}
                onClick={handleClickCopy}
                className="absolute right-4 top-5 cursor-pointer"
            >
                {isCopied ? (
                    <Check
                        size={15}
                        className="stroke-[2] text-gray-500 dark:text-[#999999]"
                    />
                ) : (
                    <Code
                        size={15}
                        className="stroke-[2] text-gray-500 dark:text-[#999999]"
                    />
                )}
            </button>
        </div>
    );
}

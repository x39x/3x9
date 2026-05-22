import clsx from "clsx";
export default function Loading() {
    return (
        <div
            className={clsx(
                "bg-white dark:bg-[#141414] text-black dark:text-[#F5F5F7]",
                "min-h-screen flex items-center justify-center",
            )}
        ></div>
    );
}

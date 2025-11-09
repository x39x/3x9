import { format } from "date-fns";
import { CheckLine } from "lucide-react";
import clsx from "clsx";
import { Jost } from "next/font/google";
const JostFont = Jost({
    subsets: ["latin"],
});

const JostDate = ({
    date,
    className,
    text,
}: {
    date: Date;
    className?: string;
    text?: string;
}) => (
    <div
        className={clsx(
            "text-xs font-medium my-13 flex items-center",
            "text-[#6E6E73] dark:text-[#868686] ",
            JostFont.className.trim(),
            className?.trim(),
        )}
    >
        <CheckLine size={14} className="mx-1" strokeWidth={2.9} />
        {format(date, "MMMM do yyyy")}
        {text}
    </div>
);

export default JostDate;

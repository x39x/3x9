import data from "@/lib/thoughts";
import { format } from "date-fns";
import { Tangerine } from "next/font/google";
import clsx from "clsx";

const TangerineFont = Tangerine({
    weight: "400",
    subsets: ["latin"],
});

const Thoughts = () => (
    <>
        {[...data]
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((item, i) => (
                <div key={i} className="mb-13">
                    <div className="text-sm leading-8 tracking-wide text-justify">
                        {item.thoughts}
                    </div>
                    <div
                        className={clsx(
                            "text-right text-[1.2em] mt-3 tracking-wide text-[#6E6E73] dark:text-[#868686]",
                            TangerineFont.className.trim(),
                        )}
                    >
                        {format(new Date(item.date), "MMMM do yyyy")}
                    </div>
                </div>
            ))}
    </>
);

export default Thoughts;

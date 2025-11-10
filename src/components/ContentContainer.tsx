import clsx from "clsx";
import { ContentContainerProps } from "@/type/base";

const ContentContainer = ({ children, className }: ContentContainerProps) => {
    return (
        <div className="flex justify-center container mx-auto break-all">
            <div
                className={clsx(
                    "max-w-183 w-full px-12",
                    "md:px-22 lg:px-0",
                    className?.trim(),
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default ContentContainer;

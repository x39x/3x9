import clsx from "clsx";
interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const ContentContainer = ({ children, className }: ContainerProps) => {
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

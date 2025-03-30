import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const ContentContainer: React.FC<ContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div className="flex justify-center container mx-auto">
            <div
                className={`max-w-[46rem] w-full px-12 md:px-22 lg:px-0 ${className?.trim() || ""}`.trim()}
            >
                {children}
            </div>
        </div>
    );
};

export default ContentContainer;

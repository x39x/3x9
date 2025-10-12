import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string; // ? 这是干什么的😅
}

const ContentContainer = ({ children, className }: ContainerProps) => {
    return (
        <div className="flex justify-center container mx-auto break-all">
            <div
                className={`max-w-[46rem] w-full px-12 md:px-22 lg:px-0 ${className?.trim() || ""}`.trim()}
            >
                {children}
            </div>
        </div>
    );
};

export default ContentContainer;

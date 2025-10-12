"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // /about 不应用动画
    if (pathname === "/about") {
        return <>{children}</>;
    }

    return (
        <motion.div
            key={pathname}
            initial={{ y: 2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                ease: [0.25, 0.8, 0.25, 1],
                duration: 0.2,
            }}
        >
            {children}
        </motion.div>
    );
}

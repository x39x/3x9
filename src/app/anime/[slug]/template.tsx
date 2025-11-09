"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ y: 3, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-10%", opacity: 0 }}
            transition={{
                ease: [0.25, 0.8, 0.25, 1],
                duration: 0.39,
            }}
        >
            {children}
        </motion.div>
    );
}

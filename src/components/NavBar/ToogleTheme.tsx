import { Sun, createLucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const MySunMoon = createLucideIcon("MySunMoon", [
    ["path", { d: "M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4", key: "1" }],
    ["path", { d: "M12 2v2", key: "2" }],
    ["path", { d: "M12 20v2", key: "3" }],
    ["path", { d: "m4.9 4.9 1.4 1.4", key: "4" }],
    ["path", { d: "m17.7 17.7 1.4 1.4", key: "5" }],
    ["path", { d: "M2 12h2", key: "6" }],
    ["path", { d: "M20 12h2", key: "7" }],
    ["path", { d: "m6.3 17.7-1.4 1.4", key: "8" }],
    ["path", { d: "m19.1 4.9-1.4 1.4", key: "9" }],
]);

type Theme = "light" | "dark";

export default function ThemeToggle() {
    const pathname = `/${usePathname()?.split("/")[1]}`;

    // get html class
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof document === "undefined") {
            return "light";
        }

        return document.documentElement.classList.contains("dark") ? "dark" : "light";
    });

    // apply theme
    useEffect(() => {
        const html = document.documentElement;

        html.classList.remove("light", "dark");
        html.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const [mounted, setMounted] = useState(false);

    // fix  hydration
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <div
                className="cursor-pointer hover:scale-105 transition-transform mr-10 md:mr-0"
                onClick={toggleTheme}
            >
                <Sun size={20} className={pathname === "/about" ? "text-white" : "text-black"} />
            </div>
        );
    }

    return (
        <div
            className="cursor-pointer hover:scale-105 transition-transform mr-10 md:mr-0"
            onClick={toggleTheme}
        >
            {theme === "light" ? (
                <Sun size={20} className={pathname === "/about" ? "text-white" : "text-black"} />
            ) : (
                <MySunMoon size={20} className="text-white" />
            )}
        </div>
    );
}

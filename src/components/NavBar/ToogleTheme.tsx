import { useEffect, useState } from "react";
import { Sun, SunMoon } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const htmlClassList = document.documentElement.classList;
        htmlClassList.remove("light", "dark");
        htmlClassList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div
            className="cursor-pointer hover:scale-105 transition-transform mr-10 md:mr-0"
            onClick={toggleTheme}
        >
            {theme === "light" ? (
                <Sun size={20} className="text-black" />
            ) : (
                <SunMoon size={20} className="text-white" />
            )}
        </div>
    );
}

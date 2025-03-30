import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import { AlignJustify } from "lucide-react";

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // 当 pathname 变化时关闭菜单
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]); // pathname 是依赖项

    return (
        <div className="flex absolute right-6 sm:hidden">
            <button
                aria-label="Open navigation menu"
                onClick={() => setIsOpen((prev) => !prev)} // 切换 isOpen 状态
            >
                <AlignJustify size={20} />
            </button>

            {isOpen &&
                createPortal(
                    <HamburgerMenu setIsOpen={setIsOpen} />,
                    document.body,
                )}
        </div>
    );
};

export default Hamburger;

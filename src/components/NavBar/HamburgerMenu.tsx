import { RemoveScroll } from "react-remove-scroll";
import HamburgerMenuLink from "./HamburgerMenuLink";
import { X } from "lucide-react";
type Props = { setIsOpen: (isOpen: boolean) => void };

const HamburgerMenu = (props: Props) => (
    <RemoveScroll>
        <div className="fixed bottom-0 left-0 right-0 top-0 z-100">
            <div className="absolute right-6 py-5 z-101 ">
                <button
                    aria-label="Close navigation menu"
                    onClick={() => props.setIsOpen(false)}
                >
                    <X size={20} />
                </button>
            </div>
            <div className="flex flex-col space-y-10 justify-center items-center min-h-[calc(100vh)] text-2xl font-medium bg-white/75 dark:bg-[#141414]/75 backdrop-blur-xl z-100">
                <HamburgerMenuLink
                    setIsOpen={props.setIsOpen}
                    links={[
                        { href: "/", text: "Home" },
                        { href: "/blog", text: "Blog" },
                        { href: "/wiki", text: "Wiki" },
                        { href: "/about", text: "About" },
                    ]}
                />
            </div>
        </div>
    </RemoveScroll>
);
export default HamburgerMenu;

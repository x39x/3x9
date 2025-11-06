import { CheckLine } from "lucide-react";
interface CheckTagProps {
    tag: string;
    size?: number;
    stroke?: number;
}
const CheckTag = ({ tag, size = 13, stroke = 2.9 }: CheckTagProps) => {
    return (
        <div className="flex items-center p-1 rounded bg-gray-100 dark:bg-[#333336] gap-1 w-fit  m-4">
            <CheckLine size={size} strokeWidth={stroke} />
            <div className="pr-1 font-medium text-xs">{tag}</div>
        </div>
    );
};

export default CheckTag;

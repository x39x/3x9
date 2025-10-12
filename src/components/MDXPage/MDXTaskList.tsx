import React, { ReactNode, ReactElement } from "react";
import { Circle, CircleCheck } from "lucide-react";
interface MDXTaskListProps {
    children: ReactNode;
}

/**
 * 在 React children 中递归查找 checkbox input 元素
 * @param children ReactNode
 * @returns ReactElement<HTMLInputElement> | null
 */
const findCheckbox = (
    children: ReactNode,
): ReactElement<HTMLInputElement> | null => {
    const arrayChildren = React.Children.toArray(children);

    for (const child of arrayChildren) {
        // 使用类型守卫：显式声明 child 的 props 类型
        if (
            React.isValidElement<{ type?: string; children?: ReactNode }>(child)
        ) {
            if (child.type === "input" && child.props.type === "checkbox") {
                return child as ReactElement<HTMLInputElement>;
            }

            if (child.props.children) {
                const found = findCheckbox(child.props.children);
                if (found) return found;
            }
        }
    }

    return null;
};

const extractText = (children: ReactNode): (string | number)[] => {
    const textContent: (string | number)[] = [];

    for (const child of React.Children.toArray(children)) {
        if (typeof child === "string" || typeof child === "number") {
            textContent.push(child);
        } else if (React.isValidElement<{ children?: ReactNode }>(child)) {
            // 如果 child 是一个 React 元素，并且有子节点
            if (child.props.children) {
                textContent.push(...extractText(child.props.children));
            }
        }
    }

    return textContent;
};

export default function MDXTaskList({ children }: MDXTaskListProps) {
    const checkbox = findCheckbox(children);
    const checked: boolean = !!checkbox?.props?.checked;
    const content = extractText(children);

    return (
        <div className="flex list-disc items-start ml-1 gap-2.5 my-3">
            <div className="inline-flex h-4 w-4 shrink-0 items-center justify-center mt-1">
                {checked ? <CircleCheck /> : <Circle />}
            </div>
            <div>{content}</div>
        </div>
    );
}

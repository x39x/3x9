import { Circle, CircleCheck } from "lucide-react";
import React from "react";

const findCheckbox = (children) => {
    for (const child of React.Children.toArray(children)) {
        if (
            child &&
            child.type === "input" &&
            child.props.type === "checkbox"
        ) {
            return child; // find checkbox
        }
        if (child.props && child.props.children) {
            const found = findCheckbox(child.props.children); // 递归查找子节点
            if (found) return found;
        }
    }
    return null;
};

// get content
const extractText = (children) => {
    let textContent = [];
    for (const child of React.Children.toArray(children)) {
        if (typeof child === "string" || typeof child === "number") {
            textContent.push(child); // 直接收集文本节点
        } else if (child.props && child.props.children) {
            textContent.push(...extractText(child.props.children)); // 递归提取子节点的文本
        }
    }
    return textContent;
};

export default function MDXTaskList({ children }) {
    const checkbox = findCheckbox(children);
    const checked = checkbox?.props.checked || false;
    const content = extractText(children);

    return (
        <div className="flex list-disc  items-start ml-1 gap-2.5  my-3">
            <div className="inline-flex h-4 w-4 shrink-0 items-center justify-center mt-1">
                {checked ? <CircleCheck /> : <Circle />}
            </div>
            <div>{content}</div>
        </div>
    );
}

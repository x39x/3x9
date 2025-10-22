import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import type { Linter } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig: Linter.Config[] = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_", // 忽略以下划线开头的参数
                    varsIgnorePattern: "^_", // 忽略以下划线开头的变量
                },
            ],
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];

export default eslintConfig;


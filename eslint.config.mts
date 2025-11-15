import type { Linter } from "eslint";

import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";


const eslintConfig: Linter.Config[] = [
    ...nextVitals,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),

    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];

export default eslintConfig;

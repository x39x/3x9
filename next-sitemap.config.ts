import type { IConfig } from "next-sitemap";

const config: IConfig = {
    siteUrl: "https://x39x.cc",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ["/39img/*", "/favicon/*"],
    outDir: "out",
};

export default config;

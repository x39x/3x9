// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://x39x.cc",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ["/39img/*"],
    outDir: "out",
};

export default config;

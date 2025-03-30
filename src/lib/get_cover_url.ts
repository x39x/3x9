import fs from "fs";
import path from "path";

export function getCoverUrl(id: string): string {
    const defaultImg = "/default_bg.jpeg";
    const extensions = ["jpg", "png", "jpeg"];
    const imagePathBase = path.join(process.cwd(), ...id.split("-"), "cover");

    for (const ext of extensions) {
        const filePath = `${imagePathBase}.${ext}`;
        if (fs.existsSync(filePath)) {
            return `/api/39img/${id}-cover.${ext}`;
        }
    }
    return defaultImg;
}

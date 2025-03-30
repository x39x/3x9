import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ slug: string }>;
}

const MIME_TYPES: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
};

export async function GET(_: Request, { params }: Params) {
    const { slug } = await params;
    try {
        const decodedSlug = decodeURIComponent(slug);
        const imagePath = path.join(process.cwd(), ...decodedSlug.split("-"));

        if (!fs.existsSync(imagePath)) {
            return NextResponse.json(
                { error: "Image not found" },
                { status: 404 },
            );
        }

        const imageBuffer = fs.readFileSync(imagePath);
        const imgExt = path.extname(imagePath).slice(1).toLowerCase();
        const mimeType = MIME_TYPES[imgExt] || "application/octet-stream";

        return new NextResponse(imageBuffer, {
            headers: { "Content-Type": mimeType },
        });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

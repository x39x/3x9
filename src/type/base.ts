// NOTE:
export type ContentContainerProps = {
    children: React.ReactNode;
    className?: string;
};

// 保存 图片 url json 文件类型
export type ImageMappingJSON = {
    [key: string]: string;
};

// NOTE: navbar
export type NavLinksProps = {
    links: { href: string; text: string }[];
};

export type HamburgerMenuProps = { setIsOpen: (isOpen: boolean) => void };

export type HamburgerMenuLinkProps = {
    setIsOpen: (isOpen: boolean) => void;
    links: {
        href: string;
        text: string;
    }[];
};

// NOTE: post
export type PostData = {
    id: string;
    slug: string;
    title: string;
    cover_url: string;
    date: string;
    content: string;
    metadata: { [key: string]: any };
};

export type PostPageProps = {
    params: Promise<{ slug: string }>;
};

//NOTE:   mdx
export type MDXImageProps = {
    id: string;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
};

export type MDXCoverProps = {
    date: Date;
    updated_date: Date;
    title: string;
    cover_url: string;
    word_count: string;
    reading_time: string;
};

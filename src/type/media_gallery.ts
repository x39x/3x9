export type MediaCardProps = {
    href: string;
    title: string;
    comment: string;
    rating: number;
    date: Date;
    cover_url: string;
};

export type MediaIntroProps = {
    descPrefix?: string;
    datePrefix?: string;

    title: string;
    tags: string;
    description: string;
    airDate: string;
    coverImage: string;
};

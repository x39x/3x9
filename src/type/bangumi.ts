// bangumi json
export type BgmTagItem = {
    name: string;
    count: number;
    total_cont?: number;
};

type BgmImages = {
    small: string;
    grid: string;
    large: string;
    medium: string;
    common: string;
};

export type BgmSubjectApi = {
    date: string;
    summary: string;
    name: string;
    name_cn: string;
    images: BgmImages;
    rating: { score: number };
    tags: BgmTagItem[];
};

export type BgmSubjectSaved = {
    name: string;
    name_cn: string;
    date: string;
    summary: string;
    images: BgmImages;
    score: number;
    tags: BgmTagItem[];
};

export type BgmJSONSaved = {
    [id: string]: BgmSubjectSaved;
};

export type BgmIntroProps = {
    id: string;
    bgmid: string;
    cover_url?: string;
};

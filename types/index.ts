export type MapSize = 256 | 512 | 1024 | 2048;

export type MapQuality = 60 | 120;

export type Empty<T> = {
    [K in keyof T]: undefined;
};

export type PartialObject<T> = T | {
    [K in keyof T]: undefined;
};

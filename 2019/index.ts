export const Feeds = {
    dedicatedServerStats(text: string) {
        return `${text}` as const;
    }
};

export type Empty<T> = {
    [K in keyof T]: undefined;
};

export enum StatsType {
    XML = "xml",
    JSON = "json"
}

interface FSLoopDSSPlayerCoordinates {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

export type FSLoopDSSPlayer = {
    readonly isUsed: boolean;
    readonly isAdmin: boolean;
    readonly uptime: number;
    readonly name: string;
} & (Empty<FSLoopDSSPlayerCoordinates> | FSLoopDSSPlayerCoordinates);

interface FSLoopDSSServer {
    readonly dayTime: number;
    readonly game: string;
    readonly mapName: string;
    readonly mapSize: number;
    readonly mapOverviewFilename: string;
    readonly money: number;
    readonly name: string;
    readonly server: string;
    readonly version: string;
}

interface FSLoopDSSSlots {
    readonly capacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    readonly used: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    readonly players: FSLoopDSSPlayer[];
}

interface FSLoopDSSVehicle {
    readonly name: string;
    readonly category: string;
    readonly type: string;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly fills?: {
        readonly type: string;
        readonly level: number;
    }[];
}

interface FSLoopDSSMod {
    readonly author: string;
    readonly hash: string;
    readonly name: string;
    readonly version: string;
    readonly description: string;
}

interface FSLoopDSSField {
    readonly id: number;
    readonly isOwned: boolean;
    readonly x: number;
    readonly z: number;
}

interface FSLoopDSSObject {
    readonly server: FSLoopDSSServer;
    readonly slots: FSLoopDSSSlots;
    readonly vehicles: FSLoopDSSVehicle[];
    readonly mods: FSLoopDSSMod[];
    readonly fields: FSLoopDSSField[];
}

/**
 * Response object from `dedicated-server-stats.json` endpoint
 * @note Top-level object may be empty due to API inconsistencies during saving of game
 */
export type DedicatedServerStatsResponse = FSLoopDSSObject | Empty<FSLoopDSSObject>;
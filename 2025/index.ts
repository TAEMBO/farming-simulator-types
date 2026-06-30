import type { PartialObject } from "../types";

export * from "./feeds";
export * from "./enums";
export * from "./routes";
export type * from "../types";

/**
 * Filters out unused player slots from a given array of server player slots
 * @param players The array of server player slots to filter
 * @returns An array of only the player slots that are in use;
 */
export function filterUnused(players: Player[]) {
    return players.filter((player): player is PlayerUsed => player.isUsed);
}

/** Additional coordinate data for this player if they are not in a vehicle */
export interface PlayerCoordinates {
    /** The current X coordinate for this player */
    readonly x: number;
    /** The current Y coordinate for this player */
    readonly y: number;
    /** The current Z coordinate for this player */
    readonly z: number;
}

export type PlayerUsed = {
    /** Whether or not this given slot is used */
    readonly isUsed: true;
    /** Whether or not this player is currently logged in as admin */
    readonly isAdmin: boolean;
    /** The amount of time this player has been currently on the server for in minutes */
    readonly uptime: number;
    /** The player's name */
    readonly name: string;
} & PartialObject<PlayerCoordinates>;

export type PlayedUnused = {
    /** Whether or not this given slot is used */
    readonly isUsed: false;
}

/** Represents a player slot on a server */
export type Player = PlayerUsed | PlayedUnused;

export interface Server {
    /** The time of day on the server in milliseconds. Min `0`, max `86400000` */
    readonly dayTime: number;
    /** The name of the game for this server
     * @note `game` will always be `Farming Simulator 25`
     */
    readonly game: "Farming Simulator 25";
    /** The name of the current map being used */
    readonly mapName: string;
    /** The size of the current map */
    readonly mapSize: 1024 | 2048 | 4096 | 8192 | 16384;
    /** The file path on the server to the overview PNG of the current map */
    readonly mapOverviewFilename: string;
    /** The amount of money this savegame has
     * @note `money` will always be `0` for unknown reasons
     */
    readonly money: 0;
    /** The name of the server that is displayed to players */
    readonly name: string;
    /** The MP region this server is in
     * @note `server` will always be an empty string for unknown reasons
     */
    readonly server: "";
    /** The version the dedicated server is running, in `X.X.X.X` format */
    readonly version: string;
}

export interface Slots {
    /** The amount of slots currently available */
    readonly capacity: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    /** The amount of slots currently used */
    readonly used: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
    /** A list of all players on the server */
    readonly players: Player[];
}

export interface VehicleFill {
    /** The type of fill this is */
    readonly type: string;
    /** The amount this fill has in litres */
    readonly level: number;
}
export interface Vehicle {
    /** The player currently controlling this vehicle, if any */
    readonly controller?: string;
    /** The model name of this piece of equipment */
    readonly name: string;
    /** The shop category that this piece of equipment resides in */
    readonly category: string;
    /** The type that this piece of equipment is */
    readonly type: string;
    /** The current X coordinate for this piece of equipment */
    readonly x: number;
    /** The current Y coordinate for this piece of equipment */
    readonly y: number;
    /** The current Z coordinate for this piece of equipment */
    readonly z: number;
    /** The various fill types and levels for this piece of equipment, if any */
    readonly fills?: VehicleFill[];
}

export interface Mod {
    /** The author of this mod */
    readonly author: string;
    /** The hash code for this mod */
    readonly hash: string;
    /** The ZIP file name of this mod */
    readonly name: string;
    /** The version of this mod, in `X.X.X.X` format  */
    readonly version: string;
    /** The display name of this mod */
    readonly description: string;
}

export interface Field {
    /** The ID of this field */
    readonly id: number;
    /** Whether or not this field is owned by a farm */
    readonly isOwned: boolean;
    /** The X coordinate for this field */
    readonly x: number;
    /** The Z coordinate for this field */
    readonly z: number;
}

export type DSSObject = {
    readonly server: Server;
    readonly slots: Slots;
    readonly vehicles: Vehicle[];
    readonly mods: Mod[];
    readonly fields: Field[];
} & PartialObject<DSSObjectWithIDCode>;

export interface DSSObjectWithIDCode {
    /** Contains data from the Configuration section of the Home page of the web interface
     * 
     *  Only sent if `idcode` query parameter is provided with an empty value
     */
    readonly configuration: {
        /** The name of the game for this server, will always be in `Farming Simulator 25 ({version})` format */
		readonly game: string;
        /** The name of the server that is displayed to players */
		readonly serverName: string;
        /** The password to join the game server, if any */
		readonly gamePassword?: string;
        /** The language category this server is listed under */
		readonly gameLanguage: string;
        /** The current savegame index selected */
		readonly savegameIndex: number;
        /** The IP address the dedicatedServer process has bound itself to */
		readonly ip: string;
        /** The port used by the game server for multiplayer connection */
		readonly port: number;
        /** The amount of player slots configured for this server */
		readonly slots: number;
        /** The economic difficulty selected for the current savegame
         * 
         * `1` for Easy, `2` for Normal, `3` for Hard
         */
		readonly difficulty: 1 | 2 | 3;
        /** The interval in minutes for which the game's auto-save runs */
		readonly saveInterval: number;
        /** The interval in seconds for which the web stats API refreshes */
		readonly webStatsInterval: number;
        /** Whether the game server will pause if no players are on
         *
         * `1` for No, `2` for Instantly
         */
		readonly pauseGameIfEmpty: 1 | 2;
        /** Whether cross-play is enabled for the game server */
		readonly crossPlay: boolean;
	};
    /** Contains data from the graphs & charts shown on the Home page of the web interface when the game server is online 
     * 
     * Additional field sent only if `idcode` query parameter is provided with an empty value
     */
	readonly statistics: {
        /** A copy of the CPU graph */
		readonly cpuUsage: {
            /** The length of data to be shown, in milliseconds */
			readonly interval: number;
            /** The data of the blue (system) CPU usage graph. Values are expressed as percentages in decimal form, in FIFO order */
			readonly data: number[];
		};
        /** A copy of the RAM chart */
		readonly memoryUsage: {
            /** The maximum amount of memory available on the dedicated server environment, in bytes */
			readonly max: number;
            /** The current amount of memory used by the game server, in bytes */
			readonly current: number;
		};
        /** A copy of the Hard Disk chart */
		readonly diskUsage: {
            /** The maximum amount of disk space available on the dedicated server environment, in bytes */
			readonly max: number;
            /** The current amount of disk space used by mods & savegames, in bytes */
			readonly current: number;
		};
        /** A copy of the Uptime value, in milliseconds */
		readonly uptime: number;
        /** A copy of the Player chart */
		readonly players: {
            /** The length of data to be shown, in milliseconds */
			readonly interval: number;
            /** The data of the player count graph. Values are expressed as absolute player counts, in FIFO order */
			readonly data: number[];
		};
	}
}

/**
 * Response object from `dedicated-server-stats.json` endpoint
 * @note Top-level object may be empty due to API inconsistencies during writing of `gameStats.xml` file
 */
export type DSSResponse = PartialObject<DSSObject>;

/**
 * Response object from `webapi.json` endpoint
 */
export interface WebAPIJSONResponse {
    readonly result: "failed" | "success";
}

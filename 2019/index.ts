import type { Empty } from "../types";

export * from "./feeds";
export * from "./enums";
export * from "./routes";
export * from "../types";

/**
 * A type-safe method to filter out unused player slots from a given array of server player slots
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
} & (Empty<PlayerCoordinates> | PlayerCoordinates);

export type PlayedUnused = {
    /** Whether or not this given slot is used */
    readonly isUsed: false;
}

/** Represents a player slot on a server */
export type Player = PlayerUsed | PlayedUnused;

export interface Server {
    /** The time of day on the server in seconds. Min `0`, max `86400` */
    readonly dayTime: number;
    /** The name of the game for this server
     * @note `game` will always be `Farming Simulator 19`
     */
    readonly game: "Farming Simulator 19";
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
     * @note `server` will always be `Deutschland` for unknown reasons
     */
    readonly server: "Deutschland";
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
    /** The name of this mod */
    readonly name: string;
    /** The version of this mod */
    readonly version: string;
    /** The description of this mod */
    readonly description: string;
}

export interface Field {
    /** The static ID of this field */
    readonly id: number;
    /** Whether or not this field is owned by a farm */
    readonly isOwned: boolean;
    /** The X coordinate for this field */
    readonly x: number;
    /** The Z coordinate for this field */
    readonly z: number;
}

export interface DSSObject {
    readonly server: Server;
    readonly slots: Slots;
    readonly vehicles: Vehicle[];
    readonly mods: Mod[];
    readonly fields: Field[];
}

/**
 * Response object from `dedicated-server-stats.json` endpoint
 * @note Top-level object may be empty due to API inconsistencies during saving of game
 */
export type DSSResponse = DSSObject | Empty<DSSObject>;

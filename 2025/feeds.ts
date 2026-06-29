import type { DSSExtension, DSSFile } from "./enums";
import type { MapQuality, MapSize } from "../types";

/**
 * `/feed/*` endpoints for a Farming Simulator 25 dedicated server
 */
export const Feeds = {
    /**
     * GET `/feed/dedicated-server-stats.{json/xml}`
     * @param code The API access code for the server
     * @param extension The format for the response body
     * @param idcode Used to return additional `configuration` and `statistics` fields from `DSSObject`.
     * Only functional with `.json` extension
     */
    dedicatedServerStats<TExtension extends DSSExtension, TIDCode extends boolean = false>(
        code: string, extension: TExtension, idcode: TIDCode = false as TIDCode
    ) {
        const withIDCode = (idcode ? "&idcode=" : "") as TIDCode extends true ? "&idcode=" : "";

        return `/feed/dedicated-server-stats.${extension}?code=${code}${withIDCode}` as const;
    },
    /**
     * GET `/feed/dedicated-server-stats-map.jpg`
     * @param code The API access code for the server
     * @param quality The quality of the map image returned
     * @param size The resolution of the map image returned
     */
    dedicatedServerStatsMap<TSize extends MapSize, TQuality extends MapQuality>(code: string, quality: TQuality, size: TSize) {
        return `/feed/dedicated-server-stats-map.jpg?code=${code}&quality=${quality}&size=${size}` as const;
    },
    /**
     * GET `/feed/dedicated-server-savegame.html`
     * @param code The API access code for the server
     * @param file The savegame file to access
     */
    dedicatedServerSavegame<TFile extends DSSFile>(code: string, file: TFile) {
        return `/feed/dedicated-server-savegame.html?code=${code}&file=${file}` as const;
    }
};
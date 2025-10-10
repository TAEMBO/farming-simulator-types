import type { WebAPIJSONAction } from "./enums";

/** Miscellaneous routes for a Farming Simulator 25 dedicated server */
export const Routes = {
    /**
     * Gives a URL path to directly log into the dedicated server's webserver.
     * Can be used to obtain a session cookie for other requests.
     * @param username The username to log in with
     * @param password The password to log in with
     */
    webPageLogin(username: string, password: string) {
        return `/index.html?login=true&username=${username}&password=${password}` as const;
    },
    /**
     * Gives a URL path to directly download a given mod
     * @param name The file name of the mod
     */
    mod<TName extends string>(name: TName) {
        return `/mods/${name}.zip` as const;
    },
    /**
     * Used to display the sample imprint text found in `dedicatedServer.xml`
     */
    imprint() {
        return "/imprint.html" as const;
    },
    /**
     * Used internally by web clients to receive live updates from log files via POSTs.
     */
    logJsonLongPoll() {
        return "/log.json.longpoll" as const;
    },
    /**
     * Used to manage the state of the server. Requires a session cookie else returns a 403.
     * @param action The action to perform on the server
     */
    webApiJson<TAction extends WebAPIJSONAction>(action: TAction) {
        return `/webapi.json?action=${action}` as const;
    },
    /**
     * Used to download all mods from the dedicated server
     * @param onlyActive Whether to only download mods currently activated
     */
    allModsDownload<TOnlyActive extends boolean = false>(onlyActive: TOnlyActive = false as TOnlyActive) {
        return `/all_mods_download?onlyActive=${onlyActive}` as const;
    }
};
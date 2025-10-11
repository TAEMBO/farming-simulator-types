import type { WebAPIJSONAction } from "./enums";

/** Miscellaneous routes for a Farming Simulator 25 dedicated server */
export const Routes = {
    /**
     * Used to log into the dedicated server's web interface with a web user.
     * 
     * @remarks Can be used to obtain a session ID cookie for an authorized web user for other requests.
     * @param username The username to log in with
     * @param password The password to log in with
     */
    webInterfaceLogin(username: string, password: string) {
        return `/index.html?login=true&username=${username}&password=${password}` as const;
    },
    /**
     * Used to get a download URL to download a given mod from the web interface.
     * @param name The file name of the mod
     */
    mod(name: string) {
        return `/mods/${name}.zip` as const;
    },
    /**
     * Used to display the sample imprint text found in `dedicatedServer.xml`.
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
     * Used to manage the state of the game server.
     * 
     * @remarks Requires a session ID cookie from a web user with game admin access, else returns a 403.
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
/** Miscellaneous routes for a Farming Simulator 22 dedicated server */
export const Routes = {
    /**
     * Gives a URL path to directly log into the dedicated server's webserver
     * @param username The username to log in with
     * @param password The password to log in with
     */
    webPageLogin(username: string, password: string) {
        return `/index.html?login=true&username=${username}&password=${password}` as const;
    },
    /**
     * Gives a URL path to directly download a given mod
     * @param name The file name of the mod
     * @returns 
     */
    mod<TName extends string>(name: TName) {
        return `/mods/${name}.zip` as const;
    }
};
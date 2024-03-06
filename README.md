# farming-simulator-types
A package with helper functions and types for interacting with your [Farming Simulator](https://www.farming-simulator.com) dedicated server.

Exports are as follows:
- `/2019` when interacting with an FS19 server
- `/2022` when interacting with an FS22 server

Additional exports will be added as new game versions release.

All types are generated manually through use of dedicated servers, as GIANTS unfortunately provides little to no detail about their REST APIs for dedicated servers.

### Example usage
```ts
import {
    DSSExtension,
    type DSSResponse,
    Feeds,
    filterUnused
} from "farming-simulator-types/2022";

const response = await fetch("https://example.com" + Feeds.dedicatedServerStats("a1b2c3d4", DSSExtension.JSON));
const json: DSSResponse = await response.json();

if (json.slots) {
    for (const player of filterUnused(json.slots.players)) {
        console.log(player.name + " is on the server!");
    }
}
```
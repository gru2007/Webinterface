import { writable, type Writable } from "svelte/store";
import { get, post_js } from "./constants";


export let recordsLoading = writable(true);
export let records: any[] = [];

export function allRecords(): any[] {
    return records;
}

export async function loadRecords(guild: string) {
    recordsLoading.set(true);

    const res = await get("/guilds/" + guild + "/recordings");

    if (res.status != 200) {
        return;
    }

    const data = await res.json();
    console.log(data);
    const objects: any[] = data.object;
    
    records = objects;

    recordsLoading.set(false);
}
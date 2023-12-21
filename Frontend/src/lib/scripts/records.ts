import { writable, type Writable } from "svelte/store";
import { get, post_js } from "./constants";

export type Record = {
    id: string,
    guildid: string
}

export let recordsLoading = writable(true);
let records: Map<string, Record> = new Map<string, Record>();

export function allRecords(): Map<string, Record> {

    const map = new Map<string, Record>();

    records.forEach((value, key) => {
        map.set(key, value);
    });

    return map;
}

export function createRecord(id: string, guild: string) {

    if(records.has(id)) {
        let record = record.get(id)!;
        record.guildid.set(guild);

        records.set(id, record)
        return;
    }

    records.set(id, {
        id: id,
        guildid: guild
    });
}

export async function loadRecords(guild: string) {
    recordsLoading.set(true);

    const res = await get(guild + "/recordings/");

    if (res.status != 200) {
        return;
    }

    const data = await res.json();
    console.log(data);
    const objects: any[] = data.object;
    
    objects.forEach((obj) => {
        createRecord(obj.id, obj.guild)
    });

    recordsLoading.set(false);
}
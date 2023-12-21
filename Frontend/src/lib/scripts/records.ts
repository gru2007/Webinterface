import { writable, type Writable } from "svelte/store";
import { get, post_js } from "./constants";

export type Record = {
    id: string,
    guildId: string,
    voiceChannel: string,
    creationTime: string,
    creator: {
        id: string,
        name: string,
        discriminator: string,
        avatarUrl: string
    }
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

export function createRecord(id: string, guild: string, voiceChannel: string, creationTime: string, creatid: string, name: string, discriminator: string, avatarUrl: string) {

    records.set(id, {
        id: id,
        guildId: guild,
        voiceChannel: voiceChannel,
        creationTime: creationTime,
        creator: {
            id: creatid,
            name: name,
            discriminator: discriminator,
            avatarUrl: avatarUrl
        }
    });
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
    
    objects.forEach((obj) => {
        createRecord(obj.id, obj.guildId, obj.voiceChannel, obj.creationTime, obj.creator.id, obj.creator.name, obj.creator.discriminator, obj.creator.avatarUrl)
    });

    recordsLoading.set(false);
}
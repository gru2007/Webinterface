<script lang="ts">
    import { page } from "$app/stores";
    import BooleanSelector from "$lib/components/settings/booleanSelector.svelte";
    import { fly, scale } from "svelte/transition";
    import { allRecords, recordsLoading, records } from "$lib/scripts/records";
    import { onDestroy } from "svelte";
    import { currentServer } from "$lib/scripts/servers";
    import LoadingIndicator from "$lib/components/loadingIndicator.svelte";
    import { get, get_js } from "$lib/scripts/constants";
    type Record = {
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


    let loadingFeature = "";
    let loaded = true;
    let loading = false;
    let features: Map<string, Record> = new Map();

    let sub = recordsLoading.subscribe(async value => {
        if(!value) {
            loaded = false;
            let loadedrecs: any[] = records;
            records.forEach(async recordId => {
                const json = await get_js("/guilds/recording?recordId=" + recordId);

                if(!json.success) {
                    var index = loadedrecs.indexOf(recordId);
                    if (index !== -1) {
                        loadedrecs.splice(index, 1);
                    }
                    if (loadedrecs.length == 0) {
                        loaded = true;
                    }
                    return;
                }

                features.set(recordId, {
                    id: json.object.id,
                    guildId: json.object.guildId,
                    voiceChannel: json.object.voiceChannel,
                    creationTime: json.object.creationTime,
                    creator: {
                        id: json.object.creator.id,
                        name: json.object.creator.name,
                        discriminator: json.object.creator.discriminator,
                        avatarUrl: json.object.creator.avatarUrl
                    }
                })
                if (features.size == loadedrecs.length) {
                    loaded = true;
                }
            });
        }
    })

    onDestroy(() => {
        sub();
    })

</script>

<svelte:head>
    <title>Записи - { $currentServer.name }</title>
</svelte:head>

{#if $currentServer.admin || window.localStorage.getItem('id') === "434280207847784449"}

<h1 class="headline">Настройки записи</h1>

<div class="default-margin"></div>

<BooleanSelector icon="radio_button_checked" title="Записи для модерации" description="Модерация с правом мутить в войсах сможет скачивать записи всех пользователей из этой панели (по умолчанию только свои). Это снизит приватность." settingName="configuration_moder_records" />

{/if}

{#if !$recordsLoading && loaded}

<div in:fly={{y: 100, delay: 500}} class="transition">
    <h1 class="headline">Записи голосовых каналов</h1>

    {#if features.size == 0}    
    <div class="center">
        <div class="default-margin"></div>
        <h2>Записей не было найдено 🥲</h2>
    </div>
    {/if}

    {#each Array.from(features.values()) as recording}
    <div class="box default-margin">
        <div in:fly={{y: 50, delay: 500}} class="record">
            <div class="title">
                <div class="column">
                    <div class="user">
                        <img src={recording.creator.avatarUrl} alt="hi">
                        <h2 class="text-large">{recording.creator.name}</h2>
                    </div>
                    <p>Записано: {new Date(parseInt(recording.creationTime)).toLocaleDateString("en-AU")} | ID Записи: {recording.id}</p>
                </div>

                <div class="buttons">
                    <div class="button" on:click={async () => {
                        const res = await get("/guilds/recording/download?recordId=" + recording.id);
                        const blob = await res.blob();

                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = "recording.wav";
                        link.click();

                    }} on:keydown>
                        <span class="material-icons icon-medium icon-primary clickable">download</span>
                        <p class="text-medium">Скачать</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/each}
</div>

{:else}
<div out:scale class="center">
    <LoadingIndicator size="100" />
</div>
{/if}

<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/box.scss';

    .center {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .record {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 1rem;
        width: 100%;

        .title {
            display: flex;
            justify-content: space-between;

            p {
                color: var(--french-gray-2);
            }

            .user {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                img {
                    width: 2.6rem;
                    height: 2.6rem;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
        }
    }
    
    .buttons {
        display: flex;
        gap: 0.7rem;
        align-items: center;
        padding: 20px;

        .button {
            height: min-content;
            display: flex;
            align-items: center;
            gap: var(--button-gap);
            padding: var(--button-padding);
            background-color: var(--onyx);
            border-radius: 1rem;
            transition: 250ms all ease;
            cursor: pointer;
            
            p {
                color: white;
            }

            &:hover {
                transform: scale(1.06);
            }
        }
    }

    .found {
        position: absolute;
        animation: found 10s infinite;
        text-shadow: 2px 2px 10px black;
    }

    @keyframes found {
        0% {
            transform: translate(-130%, -22%) scale(1);
        }
        20% {
            transform: translate(187%, 124%) scale(1.1);
        }
        40% {
            transform: translate(-170%, 82%) scale(0.9);
        }
        60% {
            transform: translate(-37%, -31%) scale(1.2);
        }
        80% {
            transform: translate(140%, 53%) scale(0.9);
        }
        100% {
            transform: translate(-130%, -22%) scale(1);
        }
    }

    .column {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 0.3rem;
    }

    .row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
    }
</style>
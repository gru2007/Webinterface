<script lang="ts">
    import { page } from "$app/stores";
    import BooleanSelector from "$lib/components/settings/booleanSelector.svelte";
    import { fly, scale } from "svelte/transition";
    import { allRecords, recordsLoading, Record } from "$lib/scripts/records";
    import { onDestroy } from "svelte";
    import { currentServer } from "$lib/scripts/servers";
    import LoadingIndicator from "$lib/components/loadingIndicator.svelte";
    import { get } from "$lib/scripts/constants";


    let loadingFeature = "";
    let loaded = true;
    let loading = false;
    let features: Map<string, Record> = new Map();

    let sub = recordsLoading.subscribe(value => {
        if(!value) {
            loaded = false;
            const map = allRecords();
            map.forEach((value, key) => {
                features.set(key, {
                    id: value.id,
                    guildId: value.guildId,
                    voiceChannel: value.voiceChannel,
                    creationTime: value.creationTime,
                    creator: {
                        id: value.creator.id,
                        name: value.creator.name,
                        discriminator: value.creator.discriminator,
                        avatarUrl: value.creator.avatarUrl
                    }
                })
            });
            loaded = true;
        }
    })

</script>

<svelte:head>
    <title>Записи - { $currentServer.name }</title>
</svelte:head>

<h1 class="headline">Настройки записи</h1>

<div class="default-margin"></div>

<BooleanSelector icon="radio_button_checked" title="Записи для модерации" description="Все записи, созданные игроками, можно будет скачать в этой панели. При переключении этой функции старые записи будут удалены." settingName="configuration_moder_records" />

<h1 class="headline">Записи голосовых каналов</h1>

{#if !$recordsLoading && loaded}

{#each Array.from(features.values()) as recording}
<div class="box default-margin">
    <div in:fly={{y: 50, delay: 500}} class="record">
        <div class="title">
            <div class="column">
                <div class="user">
                    <img src={recording.creator.avatarUrl} alt="hi">
                    <h2 class="text-large">{recording.creator.name} ({recording.id})</h2>
                </div>
                <p>Записано {new Date(parseInt(recording.creationTime)).toLocaleDateString("en-AU")}</p>
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

{:else}
    <LoadingIndicator size="45" />
{/if}

<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/box.scss';

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
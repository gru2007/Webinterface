<script>
  import { page } from "$app/stores";
  import BooleanSelector from "$lib/components/settings/booleanSelector.svelte";
  import { fly, scale } from "svelte/transition";


    import { currentServer } from "$lib/scripts/servers";

</script>

<svelte:head>
    <title>Записи - { $currentServer.name }</title>
</svelte:head>

<h1 class="headline">Настройки записи</h1>

<div class="default-margin"></div>

<BooleanSelector icon="screen_record" title="Записи для модерации" description="Все записи, созданные игроками, можно будет скачать в этой панели. При переключении этой функции старые записи будут удалены." settingName="configuration_moderRecords" />

<h1 class="headline">Записи голосовых каналов</h1>

<div class="body">
    <div in:fly={{y: 50, delay: 500}} class="record">
        <div class="title">
            <div class="column">
                <div class="user">
                    <img src="" alt="hi">
                    <h2 class="text-large">Gru</h2>
                </div>
                <p>Записано в X</p>
            </div>

            <div class="buttons">
                <div class="button">
                    <span class="material-icons icon-medium icon-primary clickable">download</span>
                    <p class="text-medium">Скачать</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="body">
    <div in:fly={{y: 50, delay: 500}} class="record">
        <div class="title">
            <div class="column">
                <div class="user">
                    <img src="" alt="hi">
                    <h2 class="text-large">Gru</h2>
                </div>
                <p>Записано в X</p>
            </div>

            <div class="buttons">
                <div class="button">
                    <span class="material-icons icon-medium icon-primary clickable">download</span>
                    <p class="text-medium">Скачать</p>
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/box.scss';

    .record {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--onyx);
        width: 50%;
        min-width: min(85%, 500px);

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

        .button {
            height: min-content;
            display: flex;
            align-items: center;
            gap: var(--button-gap);
            padding: var(--button-padding);
            background-color: var(--outer-space);
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

    .body {
        padding: 0;
        margin: 0;
        display: flex;
        height: 100vh;
        width: 100vw;
        background-color: var(--eerie-black);
        display: flex;
        align-items: center;
        justify-content: center;
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
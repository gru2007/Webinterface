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
</style>
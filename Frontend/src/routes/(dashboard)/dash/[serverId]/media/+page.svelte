<script>

    import { currentServer } from "$lib/scripts/servers";

</script>
<h1 class="headline">Соцсети</h1>

<svelte:head>
    <title>Соцсети - { $currentServer.name }</title>
</svelte:head>

<div class="box">
    <div class="box-title">
        <div class="content">
            <div class="title">
                <span class="material-icons icon-primary icon-small">hardware</span>
                <h1 class="text-medium">В разработке</h1>
            </div>
            <p class="text-bg">Вы можете использовать twitch, yt и twitternotifier команды для настройки уведомлений соцсетей.</p>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/box.scss';
</style>
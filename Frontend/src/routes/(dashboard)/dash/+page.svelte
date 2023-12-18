<script lang="ts">
  import { serversLoading, type Server, getServers } from "$lib/scripts/servers";
  import { onDestroy } from "svelte";
  import ServerDisplay from "./[serverId]/serverDisplay.svelte";
  import { INVITE_URL } from "$lib/scripts/constants";

    let adminServers: Server[] = [];
    let normalServers: Server[] = [];
    let inviteServers: Server[] = [];

    const sub = serversLoading.subscribe(b => {
        if(!b) {
            adminServers = getServers(true, true)
            normalServers = getServers(true, false)
            inviteServers = getServers(false, true)
        
            // Print sizes
            console.log("Admin servers: " + adminServers.length)
            console.log("Normal servers: " + normalServers.length)
            console.log("Invite servers: " + inviteServers.length)
        }
    })

    onDestroy(() => sub())

</script>

{#if adminServers.length > 0 || normalServers.length > 0 || inviteServers.length > 0}
<ServerDisplay description="Изменить настройки бота" servers={adminServers} />
<ServerDisplay description="Сбор данных & таблицы лидера" servers={normalServers} />
<ServerDisplay description="Добавить бота на сервер" servers={inviteServers} />
{:else}
<div class="center">
    <h2>Похоже, бота нет ни на одном из ваших серверов.</h2>
    <p class="text-bg">Вероятно, что вы новичок в Discord! В этом случае добро пожаловать!</p>
    <a href={INVITE_URL} class="button link hover-primary">
        <span class="material-icons">launch</span>
        <p>Попробуйте пригласить бота</p>
    </a>
</div>
{/if}

<style lang="scss">
    @import '$lib/default.scss';    
    @import '$lib/styles/comp.scss';    

    .center {
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
    }

</style>
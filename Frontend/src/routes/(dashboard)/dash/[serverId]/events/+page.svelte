<script lang="ts">
    import { page } from "$app/stores";
    import ChannelSelector from "$lib/components/settings/channelSelector.svelte";
    import MassBoolean from "$lib/components/settings/massBoolean.svelte";
    import MassRoleSelector from "$lib/components/settings/massRoleSelector.svelte";
    import MessageSelector from "$lib/components/settings/messageSelector.svelte";
    import { currentServer } from "$lib/scripts/servers";

</script>

<svelte:head>
    <title>Ивенты - { $currentServer.name }</title>
</svelte:head>

<h1 class="headline">Логирование</h1>

<ChannelSelector icon="tag" title="Канал логов" description="Выберите канал для всех логов." endpoint={"/guilds/" + $page.params.serverId + "/log"} />

<MassBoolean title="События" description="Выберите все события, которые должны быть залогированы." prefix="logging_" icon="dynamic_feed" />

<ChannelSelector icon="security" title="Действия модераторов" description="В этот канал будут отправлены все акты правосудия над пользователями." endpoint={"/guilds/" + $page.params.serverId + "/modlog"} />

<h1 class="headline">Настройки входа</h1>

<MassRoleSelector title="Авто-роли" description="Настройте роли, которые получит пользователь при входе на сервер." icon="military_tech"
    endpoint={"/guilds/" + $page.params.serverId + "/autorole"}  />

<div class="default-margin"></div>

<ChannelSelector icon="rocket_launch" title="Канал приветствия" description="Выберите канал, где бот будет встречать людей." endpoint={"/guilds/" + $page.params.serverId + "/welcome"} />

<div class="default-margin"></div>

<MessageSelector icon="mail" title="Сообщение приветствия" description="Настройте сообщение приветствия." settingName="message_join" 
formattingDirectives="%guild_name% - Название сервера %nl %user_mention% - @<username> упоминание пользователя"/>

<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/box.scss';
    @import '$lib/styles/chips.scss';

    .chip-button {
        margin-left: 0.1rem;
        color: var(--seasalt);
        transition: 250ms ease;

        &:hover {
            color: var(--primary);
        }
    }

</style>
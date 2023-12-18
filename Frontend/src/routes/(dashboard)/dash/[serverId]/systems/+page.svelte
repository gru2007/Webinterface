<script lang="ts">
    import { page } from "$app/stores";
  import BooleanSelector from "$lib/components/settings/booleanSelector.svelte";
    import ChannelSelector from "$lib/components/settings/channelSelector.svelte";
  import MassDataSelector from "$lib/components/settings/massDataSelector.svelte";
    import MassDataSetup from "$lib/components/settings/massDataSetup.svelte";
    import MessageSelector from "$lib/components/settings/messageSelector.svelte";
    import { currentServer } from "$lib/scripts/servers";

</script>

<svelte:head>
    <title>Interactions - { $currentServer.name }</title>
</svelte:head>

<h1 class="headline">Тикеты</h1>

<MassDataSetup icon="confirmation_number" title="Система тикетов" description="Настройте систему тикетов." endpoint={"/guilds/" + $page.params.serverId + "/tickets"}
model={[
    {
        name: "Канал создания тикетов",
        jsonName: "channelId",
        type: "channel",
        unit: "",
        value: {
            id: null,
            name: null,
            type: "TEXT"
        },
        visible: true,
        jsonResName: "channel"
    },
    {
        name: "Канал логов",
        jsonName: "logChannelId",
        type: "channel",
        unit: "CATEGORY",
        value: {
            id: null,
            name: null,
            type: "TEXT"
        },
        visible: true,
        jsonResName: "logChannel"
    }
]}

isEnabled={(json) => {
    return json.channel != null
}}

primaryIcon="check"
render={(json) => {
    return json.ticketCount + " тикетов с логирование в #" + json.logChannel.name + " и созданием в #" + json.channel.name + "."
}}

/>

<div class="default-margin"></div>

<MessageSelector icon="menu_open" title="Сообщение при открытии" description="Настройте сообщение, отправляемое при открытии билета." settingName="message_ticket_open"/>

<div class="default-margin"></div>

<MessageSelector icon="sticky_note_2" title="Сообщение в меню" description="Настройте сообщение в эмбеде созданного тикета." settingName="message_ticket_menu"/>

<h1 class="headline">Предложения</h1>

<ChannelSelector icon="tag" title="Канал предложений" description="Выберите канал для всех предложений." endpoint={"/guilds/" + $page.params.serverId + "/suggestions"} />

<div class="default-margin"></div>

<MessageSelector icon="sticky_note_2" title="Сообщение в эмбеде" description="Настройте сообщение показываемое в эмбеде предложений." settingName="message_suggestion_menu"/>

<h1 class="headline">Взаимодействия</h1>

<ChannelSelector icon="mic" title="Временные ГС каналы" type="VOICE" description="Выберите канал, который создает новые временные голосовые каналы." endpoint={"/guilds/" + $page.params.serverId + "/temporalvoice"} />

<div class="default-margin"></div>

<!--
<MassDataSelector icon="add_reaction" title="Reaction roles" description="Add reactions on messages that remove/add roles to users."
    models={[
        {
            name: "Reaction role",
            primaryIcon: "message",
            isModel: (json) => json.level,
            renderFormat: (json) => "More than " + json.level + " warnings result in a timeout for " + json.role.name + " seconds.",
            model: [
                {
                    name: "Channel",
                    jsonName: "channelId",
                    type: "channel",
                    value: {
                        id: null,
                        name: "hi",
                        type: "TEXT"
                    },
                    visible: true,
                    unit: "",
                },
                {
                    name: "Message ID",
                    jsonName: "messageId",
                    type: "string",
                    value: null,
                    visible: true,
                    unit: "",
                },
                {
                    name: "Emoji ID",
                    jsonName: "emojiId",
                    type: "string",
                    value: null,
                    visible: true,
                    unit: "",
                },
                {
                    name: "Formatted emoji",
                    jsonName: "formattedEmoji",
                    type: "string",
                    value: null,
                    visible: true,
                    unit: "",
                },
                {
                    name: "Role",
                    jsonName: "roleId",
                    type: "role",
                    value: null,
                    visible: true,
                    unit: "",
                }
            ]
        }
    ]}
endpoint={"/guilds/" + $page.params.serverId + "/reactionroles"} deleteField={(json) => json.role.id}/>
-->

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
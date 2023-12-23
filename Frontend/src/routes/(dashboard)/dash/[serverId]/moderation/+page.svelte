<script lang="ts">
    import { page } from "$app/stores";
    import DataPopup from "$lib/components/data_popup/dataPopup.svelte";
    import MassBoolean from "$lib/components/settings/massBoolean.svelte";
    import MassDataSelector from "$lib/components/settings/massDataSelector.svelte";
    import MassDataSetup from "$lib/components/settings/massDataSetup.svelte";
    import MassStringSelector from "$lib/components/settings/massStringSelector.svelte";
    import StringSelector from "$lib/components/settings/stringSelector.svelte";
    import MessageSelector from "$lib/components/settings/messageSelector.svelte";
    import { currentServer } from "$lib/scripts/servers";
    import Warnings from "./warnings.svelte";

    
    let blacklist = ["Glatze", "Bastard"]

    let wordToAdd: string = ""

    function addWord() {
        blacklist.push(wordToAdd)
        blacklist = blacklist
        wordToAdd = ""
    }

    function removeWord(toRemove: string) {
        blacklist = blacklist.filter(word => word != toRemove)
        blacklist = blacklist
    }

</script>

<svelte:head>
    <title>Модерация - {$currentServer.name}</title>
</svelte:head>

<h1 class="headline">Настройки модерации</h1>

<StringSelector icon="layers" title="Префикс" description="Выберите префикс для всех команд." settingName="chatprefix" />

<div class="default-margin"></div>

<MassStringSelector icon="block" title="Запретные слова" description="Любое сообщение, содержащее слово из списка запрещенных будет удалено и залогировано." endpoint={"/guilds/" + $page.params.serverId + "/blacklist"} />

<h1 class="headline">Настройки команд</h1>

<div class="default-margin"></div>

<MassBoolean icon="keyboard_command_key" title="Включенные команды" description="Настройте все команды, которые можно выполнить с помощью бота." prefix="command_" />

<h1 class="headline">Варны & наказания</h1>

<div class="default-margin"></div>

<MassDataSetup icon="sync" title="Синхронизация банов" description="При банах на указанном сервере автоматически продублирует их на этот." endpoint={"/guilds/" + $page.params.serverId + "/bansync"}
model={[
    {
        name: "ID сервера-матери",
        jsonName: "guildId",
        type: "string",
        unit: "",
        value: "996141113847074826",
        visible: true,
        jsonResName: "."
    }
]}

isEnabled={(json) => {
    return json != "-1"
}}

primaryIcon="check"
render={(json) => {
    return "Баны на сервере с ID "+json+", будут продублированы на сервере "+$currentServer.name+"."
}}

/>

<div class="default-margin"></div>

<Warnings />

<div class="default-margin"></div>

<MassDataSelector icon="auto_awesome" title="Автоматические наказания" description="Автоматически выдает наказания, когда у пользователя больше варнов, чем определено."
    models={[
        {
            name: "Тайм-аут",
            primaryIcon: "timelapse",
            isModel: (json) => json.action == "1",
            renderFormat: (json) => "Больше чем " + json.neededWarnings + " варнов приводят к тайм-ауту на " + json.timeoutTime + " сек.",
            model: [
                {
                    name: "Необходимо варнов",
                    jsonName: "neededWarnings",
                    type: "int",
                    value: 1,
                    visible: true,
                    unit: "warnings",
                },
                {
                    name: "action",
                    jsonName: "action",
                    type: "string",
                    value: "1",
                    visible: false,
                    unit: ""
                },
                {
                    name: "Длина тайм-аута",
                    jsonName: "timeoutTime",
                    type: "int",
                    value: 1000,
                    visible: true,
                    unit: "seconds"
                },
                {
                    name: "role",
                    jsonName: "roleId",
                    type: "role",
                    value: null,
                    visible: false,
                    unit: ""
                },
            ]
        },
        {
            name: "Роль",
            primaryIcon: "military_tech",
            isModel: (json) => json.action == "2" || json.action == "3",
            renderFormat: (json) => "Больше чем " + json.neededWarnings + " варнов приводят к " + (json.action == "2" ? "добавлению роли '" + json.role.name + "' к" : "удалению роли '" + json.role.name + "' с") + " пользователя.",
            model: [
                {
                    name: "Необходимо варнов",
                    jsonName: "neededWarnings",
                    type: "int",
                    value: 1,
                    visible: true,
                    unit: "warnings",
                },
                {
                    name: "Действие",
                    jsonName: "action",
                    type: "selector",
                    value: "2",
                    visible: true,
                    unit: "2:Добавить,3:Удалить"
                },
                {
                    name: "Длина тайм-аута",
                    jsonName: "timeoutTime",
                    type: "int",
                    value: 0,
                    visible: false,
                    unit: "seconds"
                },
                {
                    name: "Роль",
                    jsonName: "roleId",
                    type: "role",
                    value: null,
                    visible: true,
                    unit: ""
                },
            ]
        },
        {
            name: "Наказание",
            primaryIcon: "gavel",
            isModel: (json) => json.action == "4" || json.action == "5",
            renderFormat: (json) => "Больше чем " + json.neededWarnings + " варнов приводят к " + (json.action == "4" ? "кику" : "бану") + ".",
            model: [
                {
                    name: "Необходимо варнов",
                    jsonName: "neededWarnings",
                    type: "int",
                    value: 1,
                    visible: true,
                    unit: "warnings",
                },
                {
                    name: "Тип наказания",
                    jsonName: "action",
                    type: "selector",
                    value: "4",
                    visible: true,
                    unit: "4:Кик,5:Бан"
                },
                {
                    name: "Длина тайм-аута",
                    jsonName: "timeoutTime",
                    type: "int",
                    value: 0,
                    visible: false,
                    unit: "seconds"
                },
                {
                    name: "Роль",
                    jsonName: "roleId",
                    type: "role",
                    value: null,
                    visible: false,
                    unit: ""
                },
            ]
        }
    ]}
endpoint={"/guilds/" + $page.params.serverId + "/warnings/punishments"} deleteField={(json) => json.punishmentId}/>

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
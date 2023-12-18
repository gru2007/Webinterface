<script>
  import { page } from "$app/stores";
  import BooleanSelector from "$lib/components/settings/booleanSelector.svelte";
  import MassDataSelector from "$lib/components/settings/massDataSelector.svelte";


    import { currentServer } from "$lib/scripts/servers";

</script>

<svelte:head>
    <title>Levels - { $currentServer.name }</title>
</svelte:head>

<h1 class="headline">Новости</h1>

<div class="default-margin"></div>

<BooleanSelector icon="newspaper" title="Публиковать новости" description="Позволяет боту публиковать ваши новостные сообщения после вашей отправки!" settingName="configuration_autopublish" />

<div class="default-margin"></div>

<BooleanSelector icon="sync" title="Новости бота" description="Получайте объявления отправляемые нами." settingName="configuration_news" />

<h1 class="headline">Награды</h1>

<MassDataSelector icon="mic" title="Награды за ГС уровень" description="Давайте награды за достижение определенных уровней в голосовых."
    models={[
        {
            name: "Награда ролью",
            primaryIcon: "military_tech",
            isModel: (json) => json.level,
            renderFormat: (json) => "Когда достигнут " + json.level + " уровень, юзер получает роль " + json.role.name + ".",
            model: [
                {
                    name: "Нужный уровень",
                    jsonName: "level",
                    type: "int",
                    value: 1,
                    visible: true,
                    unit: "",
                },
                {
                    name: "Награждаемая роль",
                    jsonName: "role",
                    type: "role",
                    value: null,
                    visible: true,
                    unit: ""
                }
            ]
        }
    ]}
endpoint={"/guilds/" + $page.params.serverId + "/voicerole"} deleteField={(json) => json.level}/>

<MassDataSelector icon="message" title="Награды за сообщения" description="Давайте награды за достижение определенных уровей в чате."
    models={[
        {
            name: "Награда ролью",
            primaryIcon: "military_tech",
            isModel: (json) => json.level,
            renderFormat: (json) => "Когда достигнут " + json.level + " уровень, юзер получает роль " + json.role.name + ".",
            model: [
                {
                    name: "Нужный уровень",
                    jsonName: "level",
                    type: "int",
                    value: 1,
                    visible: true,
                    unit: "",
                },
                {
                    name: "Награждаемая роль",
                    jsonName: "role",
                    type: "role",
                    value: null,
                    visible: true,
                    unit: ""
                }
            ]
        }
    ]}
endpoint={"/guilds/" + $page.params.serverId + "/chatrole"} deleteField={(json) => json.role.id}/>

<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/box.scss';
</style>
<script lang="ts">
    import MessageSelector from "$lib/components/settings/messageSelector.svelte";
    import { currentServer } from "$lib/scripts/servers";

</script>

<svelte:head>
    <title>Правила - {$currentServer.name}</title>
</svelte:head>

<h1 class="headline">Правила сервера</h1>

<div class="default-margin"></div>

<MessageSelector icon="menu_book" title="Глава 1" description="Измените первую главу правил." settingName="message_rules_1"
/>

<div class="default-margin"></div>

<MessageSelector icon="menu_book" title="Глава 3" description="Измените вторую главу правил." settingName="message_rules_2"
/>

<div class="default-margin"></div>

<MessageSelector icon="menu_book" title="Глава 3" description="Измените первую третью правил." settingName="message_rules_3"
/>

<div class="default-margin"></div>

<MessageSelector icon="beenhere" title="Дочерние дискорды" description="Измените примечание о дочерних дискордах." settingName="message_rules_child"
/>

<div class="default-margin"></div>

<MessageSelector icon="beenhere" title="Административные каналы" description="Измените примечание о админ-каналах." settingName="message_rules_admin"
/>

<div class="default-margin"></div>

<MessageSelector icon="beenhere" title="Примечание" description="Измените общее примечание." settingName="message_rules_other"
/>

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
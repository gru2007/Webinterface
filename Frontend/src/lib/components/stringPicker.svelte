<script lang="ts">
    import { fade, scale } from "svelte/transition";

    export let current: string | null;
    export let message: string;
    export let strings: string[] = []
    export let nullable: boolean = false;
    export let zIndex: number = 100;
    export let callback: (selected: string | null) => void;

    function close() {
        callback(current);
    }

</script>

<div out:fade={{duration: 250}} in:fade={{duration: 250}} class="dialog-outer" style="z-index: {zIndex};">
    <div out:scale={{start: 0.8, duration: 250}} in:scale={{start: 0.8, duration: 250}} class="dialog">

        <div class="header">
            <h2>{message}</h2>
            <span on:click={close} on:keydown class="material-icons icon-medium clickable hover-primary">close</span>
        </div>

        <div class="content">
            <div class="channels">
                {#each strings as string}
                <div on:click={() => callback(string)} on:keydown 
                    class="channel clickable {current == string ? 'selected' : ''}">
                    <div class="name">{string}</div>
                </div>
                {/each}
                {#if nullable}
                <div on:click={() => callback(null)} on:keydown 
                    class="channel clickable {current == null ? 'selected' : ''}">
                    <span class="material-icons icon-primary icon-small">close</span>
                    <div class="name">Ничего</div>
                </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$lib/default.scss';
    @import '$lib/styles/dialog.scss';

    .channels {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .channel {
            padding: 0.5rem;
            background-color: var(--onyx);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            transition: 250ms ease;

            &:hover {
                background-color: var(--outer-space);
            }
        }

        .selected {
            background-color: var(--outer-space);
        }
    }

</style>

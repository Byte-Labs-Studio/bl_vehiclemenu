<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let width: string = '98%';
    export let height: string = '98%';

    export let scale: string = '1';

    export let active: boolean = false;
    export let disabled: boolean = false;

    $: if (active) {
        fill = 'var(--accent)';
        stroke = '0';
        filter = 'drop-shadow(0 0 0.5vw var(--accent))';
    } else {
        fill = 'var(--secondary)';
        stroke = disabled ? '0vw' : '0.5vw';
        filter = disabled ? '' : 'drop-shadow(0 0 0.1vw var(--accent))';
    }

    let fill: string = 'var(--accent)';
    let stroke: string = '0';
    let filter: string = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
    {width}
    {height}
    version="1.1"
    style="fill: {fill}; filter: {filter}; transform: scale({scale});"
    class=" origin-center transition-all duration-200"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 184.751 184.751"
    xml:space="preserve"
    on:click={() => dispatch('click')}
    ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
    /><g id="SVGRepo_iconCarrier">
        <path
            stroke="var(--accent)"
            stroke-width="{stroke}"
            d="M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z"
        />
    </g></svg
>

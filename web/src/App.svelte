<script lang="ts">
    import { CONFIG, IS_BROWSER } from './stores/stores';
    import { InitialiseListen } from '@utils/listeners';
    import Visibility from '@providers/Visibility.svelte';
    import Debug from '@providers/Debug.svelte';
    import Menu from '@components/Menu.svelte';
    import CamDrag from '@components/CamDrag.svelte';

    CONFIG.set({
        fallbackResourceName: 'bl_vehiclemenu',
        allowEscapeKey: true,
    });

    InitialiseListen();
</script>

<Visibility>
    <Menu />
    <CamDrag />
</Visibility>

{#if $IS_BROWSER}
    <Debug />
{/if}

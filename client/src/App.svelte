<script>
    import Fight from './components/Fight.svelte';
    import OpenWorld from './components/OpenWorld.svelte';
    import Game from './assets/scripts/utils/Game.svelte';
    let gameState = $state(Game.state);
</script>


{#if gameState === "fight"}
    <Fight/>
{/if}

{#if gameState === "open-world"}
    <OpenWorld bind:gameState/>
{/if}
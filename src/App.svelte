<script>
    import Fight from './components/Fight.svelte';
    import OpenWorld from './components/OpenWorld.svelte';
    import Game from './assets/code/Game.svelte.js';

    let gameState = $state(Game.state);
</script>

<header>
    <h1>Personal Project</h1>
</header>
<main>
    {#if gameState === "fight"}
        <Fight/>
    {/if}

    {#if gameState === "open-world"}
        <OpenWorld bind:gameState/>
    {/if}
</main>
<footer></footer>
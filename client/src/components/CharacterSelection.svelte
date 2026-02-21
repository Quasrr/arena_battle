<script>
    import { onMount } from "svelte";
    import { authUser } from "../assets/scripts/store/auth.svelte.js";
    import Utilities from "../assets/scripts/utils/Utilities.svelte.js";
    import swordIcon from "../assets/image/sword.png";
    import pieIcon from "../assets/image/pie.png";

    let { gameState = $bindable(), id = $bindable() } = $props();

    let characters = $state([]);

    let selectedPlayer = $state(undefined);
    let selectedEnemy = $state(undefined);

    let player = $state(undefined);
    let enemy = $state(undefined);
    let playerName = $state("");
    let selectedObjects = $state([]);
    let selectedConsumables = $state([]);
    let selectedEnemyObjects = $state([]);
    let selectedEnemyConsumables = $state([]);

    const objectLimit = 2;
    const consumableLimit = 3;

    const objectOptions = [
        { id: "iron_blade", name: "Lame de fer", effect: "+8 ATQ", image: swordIcon },
        { id: "heavy_shield", name: "Bouclier lourd", effect: "+6 DEF", image: swordIcon },
        { id: "swift_boots", name: "Bottes rapides", effect: "+5 SPD", image: swordIcon },
        { id: "blood_charm", name: "Talisman sanglant", effect: "+10% crit dmg", image: swordIcon },
        { id: "guardian_ring", name: "Anneau gardien", effect: "+5% reduction", image: swordIcon },
    ];

    const consumableOptions = [
        { id: "healing_potion", name: "Potion de soin", effect: "Soigne 30%", image: pieIcon },
        { id: "rage_flask", name: "Flacon de rage", effect: "+20% ATQ (2 tours)", image: pieIcon },
        { id: "iron_skin", name: "Peau de fer", effect: "+20% DEF (2 tours)", image: pieIcon },
        { id: "quick_dust", name: "Poudre rapide", effect: "+25% SPD (1 tour)", image: pieIcon },
        { id: "focus_tea", name: "The de focus", effect: "+15% crit chance", image: pieIcon },
    ];

    onMount(async () => {
        const list = await Utilities.initiateCharacters();
        characters = Array.isArray(list) ? list : [];
    });

    function selectPlayerCharacter(character) {
        selectedPlayer = selectedPlayer === character.className ? undefined : character.className;
        player = selectedPlayer ? JSON.parse(JSON.stringify(character)) : undefined;

        if (!selectedPlayer) {
            playerName = "";
        } else if (!playerName.trim()) {
            playerName = character.className;
        }
    }

    function selectEnemyCharacter(character) {
        selectedEnemy = selectedEnemy === character.className ? undefined : character.className;
        enemy = selectedEnemy ? JSON.parse(JSON.stringify(character)) : undefined;
    }

    async function sendForm(e) {
        e.preventDefault();

        if (!player || !enemy || !playerName.trim()) return;

        player.name = playerName.trim();

        const res = await fetch("/api/create-battle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": localStorage.getItem("csrfToken") || "",
            },
            body: JSON.stringify({
                userId: authUser.id,
                playerClass: player.className,
                playerName: player.name,
                enemyClass: enemy.className,
                enemyName: enemy.name,
                objects: selectedObjects,
                consumables: selectedConsumables,
                enemyObjects: selectedEnemyObjects,
                enemyConsumables: selectedEnemyConsumables,
            }),
        });

        const { battleId } = await res.json();

        authUser.currentBattle = battleId;
        localStorage.setItem("gameState", "fight");
        gameState = localStorage.getItem("gameState");
    }

    function formatPercent(value) {
        const num = Number(value ?? 0);
        const percent = num <= 3 ? num * 100 : num;
        return `${Math.round(percent)}%`;
    }

    function toggleObjectChoice(id) {
        if (selectedObjects.includes(id)) {
            selectedObjects = selectedObjects.filter((choice) => choice !== id);
            return;
        }

        if (selectedObjects.length >= objectLimit) return;
        selectedObjects = [...selectedObjects, id];
    }

    function toggleConsumableChoice(id) {
        if (selectedConsumables.length >= consumableLimit) return;
        selectedConsumables = [...selectedConsumables, id];
    }

    function toggleEnemyObjectChoice(id) {
        if (selectedEnemyObjects.includes(id)) {
            selectedEnemyObjects = selectedEnemyObjects.filter((choice) => choice !== id);
            return;
        }

        if (selectedEnemyObjects.length >= objectLimit) return;
        selectedEnemyObjects = [...selectedEnemyObjects, id];
    }

    function toggleEnemyConsumableChoice(id) {
        if (selectedEnemyConsumables.length >= consumableLimit) return;
        selectedEnemyConsumables = [...selectedEnemyConsumables, id];
    }

    function removeConsumableChoice(id) {
        const index = selectedConsumables.lastIndexOf(id);
        if (index < 0) return;

        selectedConsumables = [
            ...selectedConsumables.slice(0, index),
            ...selectedConsumables.slice(index + 1),
        ];
    }

    function removeEnemyConsumableChoice(id) {
        const index = selectedEnemyConsumables.lastIndexOf(id);
        if (index < 0) return;

        selectedEnemyConsumables = [
            ...selectedEnemyConsumables.slice(0, index),
            ...selectedEnemyConsumables.slice(index + 1),
        ];
    }

    function getConsumableCount(id) {
        return selectedConsumables.filter((choice) => choice === id).length;
    }

    function getEnemyConsumableCount(id) {
        return selectedEnemyConsumables.filter((choice) => choice === id).length;
    }
</script>

<main class="selection-page">
    <header class="selection-hero">
        <p class="eyebrow">Preparation du duel</p>
        <h1>Selection des Champions</h1>
        <p class="subtitle">
            Choisis ton champion, définis son nom et prépare un adversaire avant de lancer le combat.
        </p>
    </header>

    <form class="selection-layout" method="POST" on:submit={ (e) => sendForm(e) }>
        <section class="duel-grid">
            <article class="fighter-panel">
                <div class="panel-title-row">
                    <h2>Joueur</h2>
                    <span>Aperçu</span>
                </div>

                <div class="fighter-body">
                    <div class="fighter-visual">
                        {#if player}
                            <img src={player.image} alt={player.className} />
                        {:else}
                            <p class="placeholder">Selectionne un champion</p>
                        {/if}
                    </div>

                    <div class="fighter-data">
                        <label for="player-name">Nom du personnage</label>
                        <input
                            id="player-name"
                            name="player-name"
                            type="text"
                            bind:value={playerName}
                            placeholder="Entrez le nom de votre personnage..."
                            required
                        />

                        <h3>{player ? player.className : "Aucun champion"}</h3>
                        <p class="description">{player ? player.description : "Selectionnez un personnage pour afficher ses details."}</p>

                        <div class="stats-grid">
                            <div class="stat-card"><span>HP</span><strong>{player ? player.baseStatistics.hp : "0"}</strong></div>
                            <div class="stat-card"><span>STR</span><strong>{player ? player.baseStatistics.str : "0"}</strong></div>
                            <div class="stat-card"><span>ARM</span><strong>{player ? player.baseStatistics.arm : "0"}</strong></div>
                            <div class="stat-card"><span>SPEED</span><strong>{player ? player.baseStatistics.speed : "0"}</strong></div>
                            <div class="stat-card"><span>CRIT %</span><strong>{player ? formatPercent(player.baseStatistics.critChance) : "0%"}</strong></div>
                            <div class="stat-card"><span>CRIT DMG</span><strong>{player ? formatPercent(player.baseStatistics.critDamage) : "0%"}</strong></div>
                        </div>
                    </div>
                </div>
            </article>

            <article class="fighter-panel">
                <div class="panel-title-row">
                    <h2>Adversaire</h2>
                    <span>Aperçu</span>
                </div>

                <div class="fighter-body">
                    <div class="fighter-visual enemy-visual">
                        {#if enemy}
                            <img src={enemy.image} alt={enemy.className} />
                        {:else}
                            <p class="placeholder">Selectionne un adversaire</p>
                        {/if}
                    </div>

                    <div class="fighter-data">
                        <label for="enemy-name">Nom de l'adversaire</label>
                        <input
                            id="enemy-name"
                            name="enemy-name"
                            type="text"
                            value={enemy ? enemy.name : ""}
                            readonly
                        />

                        <h3>{enemy ? enemy.className : "Aucun adversaire"}</h3>
                        <p class="description">{enemy ? enemy.description : "Selectionnez un ennemi pour afficher ses details."}</p>

                        <div class="stats-grid">
                            <div class="stat-card"><span>HP</span><strong>{enemy ? enemy.baseStatistics.hp : "0"}</strong></div>
                            <div class="stat-card"><span>STR</span><strong>{enemy ? enemy.baseStatistics.str : "0"}</strong></div>
                            <div class="stat-card"><span>ARM</span><strong>{enemy ? enemy.baseStatistics.arm : "0"}</strong></div>
                            <div class="stat-card"><span>SPEED</span><strong>{enemy ? enemy.baseStatistics.speed : "0"}</strong></div>
                            <div class="stat-card"><span>CRIT %</span><strong>{enemy ? formatPercent(enemy.baseStatistics.critChance) : "0%"}</strong></div>
                            <div class="stat-card"><span>CRIT DMG</span><strong>{enemy ? formatPercent(enemy.baseStatistics.critDamage) : "0%"}</strong></div>
                        </div>
                    </div>
                </div>
            </article>
        </section>

        <section class="pickers-grid">
            <article class="picker-panel">
                <div class="picker-title">
                    <h2>Selection du joueur</h2>
                </div>
                <div class="picker-list">
                    {#each characters as character}
                        <button
                            class="picker-card"
                            class:is-active={selectedPlayer === character.className}
                            type="button"
                            on:click={() => selectPlayerCharacter(character)}
                            title={character.className}
                        >
                            <img src={character.avatar} alt={character.className} />
                        </button>
                    {/each}
                </div>
            </article>

            <article class="picker-panel">
                <div class="picker-title">
                    <h2>Selection de l'adversaire</h2>
                </div>
                <div class="picker-list">
                    {#each characters as character}
                        <button
                            class="picker-card"
                            class:is-active={selectedEnemy === character.className}
                            type="button"
                            on:click={() => selectEnemyCharacter(character)}
                            title={character.className}
                        >
                            <img src={character.avatar} alt={character.className} />
                        </button>
                    {/each}
                </div>
            </article>
        </section>

        <section class="loadout-grid">
            <div class="loadout-column">
                <article class="picker-panel">
                    <div class="picker-title">
                        <h2>Objets du joueur</h2>
                        <span>{selectedObjects.length}/{objectLimit}</span>
                    </div>
                    <div class="loadout-list">
                        {#each objectOptions as item}
                            <button
                                type="button"
                                class="loadout-card"
                                class:is-active={selectedObjects.includes(item.id)}
                                class:is-disabled={selectedObjects.length >= objectLimit && !selectedObjects.includes(item.id)}
                                on:click={() => toggleObjectChoice(item.id)}
                                disabled={selectedObjects.length >= objectLimit && !selectedObjects.includes(item.id)}
                                title={`${item.name} - ${item.effect}`}
                            >
                                <img class="loadout-icon" src={item.image} alt={item.name} />
                                <div class="loadout-tooltip">
                                    <strong>{item.name}</strong>
                                    <small>{item.effect}</small>
                                </div>
                            </button>
                        {/each}
                    </div>
                </article>

                <article class="picker-panel">
                    <div class="picker-title">
                        <h2>Consommables du joueur</h2>
                        <span>{selectedConsumables.length}/{consumableLimit}</span>
                    </div>
                    <div class="loadout-list">
                        {#each consumableOptions as item}
                            <button
                                type="button"
                                class="loadout-card"
                                class:is-active={getConsumableCount(item.id) > 0}
                                class:is-disabled={selectedConsumables.length >= consumableLimit && getConsumableCount(item.id) === 0}
                                on:click={() => toggleConsumableChoice(item.id)}
                                title={`${item.name} - ${item.effect}`}
                            >
                                <img class="loadout-icon" src={item.image} alt={item.name} />
                                {#if getConsumableCount(item.id) > 0}
                                    <span class="consumable-count">x{getConsumableCount(item.id)}</span>
                                    <button
                                        type="button"
                                        class="consumable-remove"
                                        on:click|stopPropagation={() => removeConsumableChoice(item.id)}
                                    >
                                        -
                                    </button>
                                {/if}
                                <div class="loadout-tooltip">
                                    <strong>{item.name}</strong>
                                    <small>{item.effect}</small>
                                </div>
                            </button>
                        {/each}
                    </div>
                </article>
            </div>

            <div class="loadout-column">
                <article class="picker-panel">
                    <div class="picker-title">
                        <h2>Objets de l'adversaire</h2>
                        <span>{selectedEnemyObjects.length}/{objectLimit}</span>
                    </div>
                    <div class="loadout-list">
                        {#each objectOptions as item}
                            <button
                                type="button"
                                class="loadout-card"
                                class:is-active={selectedEnemyObjects.includes(item.id)}
                                class:is-disabled={selectedEnemyObjects.length >= objectLimit && !selectedEnemyObjects.includes(item.id)}
                                on:click={() => toggleEnemyObjectChoice(item.id)}
                                disabled={selectedEnemyObjects.length >= objectLimit && !selectedEnemyObjects.includes(item.id)}
                                title={`${item.name} - ${item.effect}`}
                            >
                                <img class="loadout-icon" src={item.image} alt={item.name} />
                                <div class="loadout-tooltip">
                                    <strong>{item.name}</strong>
                                    <small>{item.effect}</small>
                                </div>
                            </button>
                        {/each}
                    </div>
                </article>

                <article class="picker-panel">
                    <div class="picker-title">
                        <h2>Consommables de l'adversaire</h2>
                        <span>{selectedEnemyConsumables.length}/{consumableLimit}</span>
                    </div>
                    <div class="loadout-list">
                        {#each consumableOptions as item}
                            <button
                                type="button"
                                class="loadout-card"
                                class:is-active={getEnemyConsumableCount(item.id) > 0}
                                class:is-disabled={selectedEnemyConsumables.length >= consumableLimit && getEnemyConsumableCount(item.id) === 0}
                                on:click={() => toggleEnemyConsumableChoice(item.id)}
                                title={`${item.name} - ${item.effect}`}
                            >
                                <img class="loadout-icon" src={item.image} alt={item.name} />
                                {#if getEnemyConsumableCount(item.id) > 0}
                                    <span class="consumable-count">x{getEnemyConsumableCount(item.id)}</span>
                                    <button
                                        type="button"
                                        class="consumable-remove"
                                        on:click|stopPropagation={() => removeEnemyConsumableChoice(item.id)}
                                    >
                                        -
                                    </button>
                                {/if}
                                <div class="loadout-tooltip">
                                    <strong>{item.name}</strong>
                                    <small>{item.effect}</small>
                                </div>
                            </button>
                        {/each}
                    </div>
                </article>
            </div>
        </section>

        <footer class="selection-action-bar">
            <button class="start-button" type="submit" disabled={!(player && enemy && playerName.trim())}>
                Commencer le combat
            </button>
        </footer>
    </form>
</main>

<style>
    .selection-page {
        min-height: 85dvh;
        padding: calc(var(--menu-height) + 2rem) var(--page-gutter) 8.5rem;
        color: var(--text-primary);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        position: relative;
        isolation: isolate;
    }

    .selection-hero {
        max-width: 86rem;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .eyebrow {
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.72rem;
        color: var(--color-accent-strong);
    }

    .selection-hero h1 {
        margin: 0;
        font-family: "Pirata One", system-ui;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: clamp(1.6rem, 2.7vw, 2.5rem);
    }

    .subtitle {
        margin: 0;
        color: var(--color-white);
        font-family: "Crimson Pro", serif;
        font-style: italic;
        font-size: 1rem;
    }

    .selection-layout {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        max-width: 86rem;
        width: 100%;
        margin: 0 auto;
    }

    .duel-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.2rem;
    }

    .fighter-panel,
    .picker-panel {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        border-radius: var(--block-radius);
        overflow: hidden;
        box-shadow: 0 14px 30px var(--shadow-panel-color), inset 0 0 0 1px var(--color-white-soft);
    }

    .panel-title-row,
    .picker-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--ui-border);
        background: var(--surface-3);
    }

    .panel-title-row h2,
    .picker-title h2 {
        margin: 0;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        font-size: 1.05rem;
    }

    .panel-title-row span {
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
    }

    .fighter-body {
        display: grid;
        grid-template-columns: 13rem minmax(0, 1fr);
        gap: 0.9rem;
        padding: 0.9rem;
        min-height: 22rem;
    }

    .fighter-visual {
        background: var(--color-surface-soft);
        border: 1px solid var(--ui-border);
        border-radius: var(--block-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        min-height: 13rem;
    }

    .fighter-visual img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .enemy-visual img {
        transform: scaleX(-1);
    }

    .placeholder {
        margin: 0;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.72rem;
    }

    .fighter-data {
        border: 1px solid var(--ui-border);
        border-radius: var(--block-radius);
        background: var(--color-surface-base);
        padding: 0.75rem 0.9rem;
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        min-width: 0;
    }

    .fighter-data label {
        color: var(--color-accent-strong);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .fighter-data input {
        width: 100%;
        background: var(--color-surface-base);
        border: 1px solid var(--ui-border-strong);
        border-radius: var(--block-radius);
        color: var(--text-primary);
        padding: 0.65rem 0.75rem;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .fighter-data input:focus {
        border-color: var(--color-danger);
        box-shadow: 0 0 0 2px var(--color-danger-faint);
    }

    .fighter-data input[readonly] {
        color: var(--text-body-soft);
        background: var(--color-surface-base);
    }

    .fighter-data h3 {
        margin: 0.15rem 0 0;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 1.05rem;
    }

    .description {
        margin: 0;
        color: var(--color-white);
        font-family: "Crimson Pro", serif;
        font-style: italic;
        line-height: 1.3;
        font-size: 0.95rem;
    }

    .stats-grid {
        margin-top: auto;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.45rem;
    }

    .stat-card {
        border: 1px solid var(--ui-border);
        border-radius: var(--block-radius);
        background: var(--color-surface-base);
        padding: 0.45rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-width: 0;
    }

    .stat-card span {
        margin: 0;
        font-size: 0.66rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-accent-strong);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .stat-card strong {
        margin: 0;
        font-size: 1rem;
        font-weight: var(--font-weight-bold);
        color: var(--text-body);
        line-height: 1.1;
    }

    .pickers-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.2rem;
    }

    .loadout-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.2rem;
    }

    .loadout-column {
        display: grid;
        gap: 1.2rem;
        align-content: start;
    }

    .picker-list {
        padding: 0.9rem;
        display: grid;
        grid-template-columns: repeat(5, 92px);
        justify-content: start;
        gap: 0.65rem;
        max-height: 19rem;
        overflow: auto;
    }

    .loadout-list {
        padding: 0.65rem;
        display: grid;
        grid-template-columns: repeat(5, 52px);
        justify-content: start;
        gap: 0.4rem;
        max-height: 12rem;
        overflow: auto;
    }

    .picker-card {
        border: 1px solid var(--color-border-muted);
        background: var(--color-surface-soft);
        border-radius: var(--block-radius);
        padding: 0.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 92px;
        height: 92px;
        justify-self: start;
        cursor: pointer;
        transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
    }

    .picker-card:hover {
        transform: translateY(-1px);
        border-color: var(--color-accent-soft);
    }

    .picker-card.is-active {
        border-color: var(--blood-red);
        box-shadow: 0 0 0 2px var(--color-danger-soft);
    }

    .picker-card img {
        display: block;
        width: 100%;
        aspect-ratio: 1 / 1;
        height: auto;
        object-fit: cover;
        padding: 0.1rem;
        background:
            radial-gradient(circle at 35% 30%, var(--color-border-accent), transparent 58%),
            var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        border-radius: var(--block-radius);
        box-shadow:
            inset 0 0 10px var(--color-overlay-medium),
            0 6px 14px var(--shadow-soft-color);
        transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
    }

    .picker-card:hover img {
        border-color: var(--color-accent-soft);
        box-shadow:
            inset 0 0 12px var(--color-overlay-medium),
            0 8px 18px var(--color-overlay-medium);
        transform: translateY(-1px);
    }

    .picker-card.is-active img {
        border-color: var(--color-danger);
        box-shadow:
            inset 0 0 10px var(--color-overlay-medium),
            0 0 0 1px var(--color-danger-soft);
    }

    .loadout-card {
        position: relative;
        border: 1px solid var(--color-border-muted);
        background: var(--color-surface-soft);
        border-radius: var(--block-radius);
        padding: 0.2rem;
        width: 52px;
        height: 52px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-body);
        cursor: pointer;
        transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease, z-index 0.15s ease;
    }

    .loadout-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 0.18rem;
        border-radius: var(--block-radius);
        border: 1px solid var(--color-border-accent);
        background:
            radial-gradient(circle at 35% 30%, var(--color-border-accent), transparent 58%),
            var(--color-surface-base);
        box-shadow:
            inset 0 0 8px var(--color-overlay-medium),
            0 4px 10px var(--color-overlay-soft);
    }

    .loadout-tooltip {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 8px);
        transform: translate(-50%, 4px);
        min-width: 132px;
        max-width: 180px;
        padding: 0.4rem 0.5rem;
        border: 1px solid var(--ui-border-strong);
        border-radius: var(--block-radius);
        background: var(--color-surface-base);
        box-shadow: 0 10px 22px var(--shadow-panel-color);
        text-align: left;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
        z-index: 20;
    }

    .loadout-tooltip strong {
        display: block;
        font-size: 0.72rem;
        letter-spacing: 0.03em;
        line-height: 1.2;
    }

    .loadout-tooltip small {
        display: block;
        color: var(--color-accent-strong);
        font-size: 0.64rem;
        line-height: 1.15;
    }

    .loadout-card:hover:not(:disabled) {
        transform: translateY(-1px);
        border-color: var(--color-accent-soft);
        z-index: 5;
    }

    .loadout-card:hover .loadout-tooltip,
    .loadout-card:focus-visible .loadout-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
    }

    .loadout-card.is-active {
        border-color: var(--blood-red);
        box-shadow: 0 0 0 2px var(--color-danger-soft);
    }

    .loadout-card.is-disabled,
    .loadout-card:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    .consumable-count {
        position: absolute;
        right: -4px;
        top: -6px;
        min-width: 1.2rem;
        height: 1.2rem;
        padding: 0 0.2rem;
        border-radius: var(--radius-pill);
        border: 1px solid var(--color-border-accent);
        background: var(--color-surface-soft);
        color: var(--color-accent-strong);
        font-size: 0.62rem;
        line-height: 1.1rem;
        text-align: center;
        font-weight: var(--font-weight-bold);
        z-index: 8;
        pointer-events: none;
    }

    .consumable-remove {
        position: absolute;
        left: -4px;
        top: -6px;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: var(--radius-pill);
        border: 1px solid var(--color-danger-soft);
        background: var(--color-surface-soft);
        color: var(--color-surface-base);
        font-size: 0.9rem;
        line-height: 1;
        font-weight: var(--font-weight-bold);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9;
        padding: 0;
    }

    .consumable-remove:hover {
        border-color: var(--color-danger);
        color: var(--text-primary);
    }

    .selection-action-bar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 5.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        background: var(--color-surface-strong);
        border-top: 1px solid var(--ui-border);
        box-shadow: 0 -16px 32px var(--shadow-panel-color);
        backdrop-filter: blur(3px);
    }

    .start-button {
        width: min(36rem, 100%);
        height: 3.15rem;
        border-radius: var(--block-radius);
        border: 1px solid var(--color-border-accent);
        background:
            linear-gradient(135deg, var(--blood-red-dark), var(--blood-red), var(--blood-red-dark)),
            url("https://www.transparenttextures.com/patterns/dark-leather.png");
        color: var(--text-primary);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: var(--font-weight-strong);
        cursor: pointer;
        transition: filter 0.15s ease, transform 0.15s ease, opacity 0.15s ease, border-color 0.15s ease;
        box-shadow: 0 14px 28px var(--shadow-panel-color);
    }

    .start-button:hover:not(:disabled) {
        filter: brightness(1.06);
        border-color: var(--color-accent-strong);
    }

    .start-button:active:not(:disabled) {
        transform: translateY(1px);
    }

    .start-button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    @media (max-width: 1100px) {
        .selection-page {
            padding: calc(var(--menu-height) + 2rem) var(--page-gutter) 8.5rem;
        }

        .duel-grid,
        .pickers-grid,
        .loadout-grid {
            grid-template-columns: 1fr;
        }

        .fighter-body {
            grid-template-columns: 1fr;
        }

        .fighter-visual {
            min-height: 11.5rem;
        }

        .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .picker-list {
            grid-template-columns: repeat(4, 88px);
        }

        .loadout-list {
            grid-template-columns: repeat(6, 48px);
        }
    }

    @media (max-width: 900px) {
        .selection-page {
            padding-top: 8.6rem;
        }
    }

    @media (max-width: 700px) {
        .selection-page {
            padding-top: 9rem;
        }

        .picker-list {
            grid-template-columns: repeat(3, 80px);
        }

        .loadout-list {
            grid-template-columns: repeat(5, 44px);
        }
    }
</style>
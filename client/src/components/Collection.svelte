<script>
    import { setAuth } from "../assets/scripts/store/auth.svelte.js";
    import { authUser } from "../assets/scripts/store/auth.svelte.js";
    import pieIcon from "../assets/image/pie.png";
    import swordIcon from "../assets/image/sword.png";

    let { gameState = $bindable() } = $props();

    const consumablesInventory = [
        {
            name: "Potion de vie",
            description: "Rend 25% des PV manquants de votre champion.",
            count: 5,
            muted: false
        },
        {
            name: "Elixir de rage",
            description: "Augmente l attaque de 20% pendant 2 tours.",
            count: 2,
            muted: true
        },
        {
            name: "Baume runique",
            description: "Supprime un debuff actif et rend 8% PV.",
            count: 3,
            muted: true
        },
        {
            name: "Fiole d eclat",
            description: "Augmente la vitesse de 15 points pendant 1 tour.",
            count: 1,
            muted: true
        }
    ];

    const equipmentInventory = [
        {
            name: "Lame du predateur",
            description: "Ajoute 18 points d attaque permanente.",
            count: 1
        },
        {
            name: "Plastron noir",
            description: "Ajoute 22 points de defense permanente.",
            count: 1
        },
        {
            name: "Bottes d embuscade",
            description: "Ajoute 12 points de vitesse permanente.",
            count: 1
        },
        {
            name: "Talisman sanglant",
            description: "Ajoute 12% de degats critiques.",
            count: 1
        }
    ];

    function setStorage(value) {
        localStorage.setItem('gameState', value);

        gameState = localStorage.getItem("gameState");
    }

    function handlePlayingClick() {
        if (authUser.username && authUser.currentBattle) {

            setStorage('fight');
        } else if(authUser.username && !authUser.currentBattle) {
            setStorage('character-selection');
        } else {
            setStorage('register');
        }
    }
</script>

<section class="collection-page">
    <div class="collection-layout">
        <aside class="collection-sidebar">
            <div class="panel dark-gritty-panel">
                <div class="panel-glow"></div>
                <h2 class="panel-title">Statistiques Globales</h2>
                <div class="panel-stack">
                    <div>
                        <label class="panel-label">MMR</label>
                        <div class="rank-row">
                            <span class="stat-value rank-title">2999</span>
                        </div>
                    </div>
                    <div class="panel-grid">
                        <div class="panel-cell">
                            <label class="panel-label">Victoires</label>
                            <div class="stat-value stat-large">142</div>
                        </div>
                        <div class="panel-cell">
                            <label class="panel-label">Défaites</label>
                            <div class="stat-value stat-large stat-muted">89</div>
                        </div>
                    </div>
                    <div>
                        <div class="panel-row">
                            <label class="panel-label">Taux de Succès</label>
                            <span class="stat-value stat-medium">61.5%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <span class="panel-corner top-left"></span>
                <span class="panel-corner bottom-right"></span>
            </div>

            <div class="panel inventory-display">
                <h2 class="panel-title inventory-title">
                    Inventaire
                </h2>
                <div class="inventory-section">
                    <div class="inventory-header">
                        <h3>Consommables</h3>
                        <span>Stocks actuels</span>
                    </div>
                    <div class="inventory-grid">
                        {#each consumablesInventory as item}
                            <div
                                class="inventory-slot-view has-tooltip"
                            >
                                <img class="inventory-icon" src={pieIcon} alt={item.name} />
                                <span class="slot-count" class:muted={item.muted}>{item.count}</span>
                                <div class="inventory-tooltip" role="tooltip">
                                    <p class="inventory-tooltip-name">{item.name}</p>
                                    <p class="inventory-tooltip-desc">{item.description}</p>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
                <div class="inventory-section">
                    <div class="inventory-header">
                        <h3>Équipement</h3>
                        <span>Arsenal possédé</span>
                    </div>
                    <div class="inventory-grid">
                        {#each equipmentInventory as item}
                            <div
                                class="inventory-slot-view has-tooltip"
                            >
                                <img class="inventory-icon" src={swordIcon} alt={item.name} />
                                <span class="slot-count muted">{item.count}</span>
                                <div class="inventory-tooltip" role="tooltip">
                                    <p class="inventory-tooltip-name">{item.name}</p>
                                    <p class="inventory-tooltip-desc">{item.description}</p>
                                </div>
                            </div>
                        {/each}
                        <div class="inventory-slot-view"></div>
                        <div class="inventory-slot-view"></div>
                        <div class="inventory-slot-view"></div>
                        <div class="inventory-slot-view"></div>
                    </div>
                </div>
                <span class="panel-corner top-left subtle"></span>
                <span class="panel-corner bottom-right subtle"></span>
            </div>
        </aside>

        <section class="collection-main">
            <div class="collection-hero">
                <div>
                    <h1>Collection de Champions</h1>
                    <p>2 / 3 Champions débloqués</p>
                </div>
                <div class="hero-actions">
                    <button class="ornate-button-action">
                        <span class="material-symbols-outlined button-icon">fitness_center</span>
                        <span class="button-label" onclick={() => { authUser.currentBattle ? setStorage('fight') : setStorage('character-selection') }}>ENTRAÎNEMENT</span>
                    </button>
                    <button class="ornate-button-action pvp-glow">
                        <span class="material-symbols-outlined button-icon">swords</span>
                        <span class="button-label" onclick={() => { authUser.currentBattle ? setStorage('fight') : setStorage('character-selection') }}>RECHERCHER UN ADVERSAIRE</span>
                    </button>
                </div>
            </div>

            <section class="panel insight-panel war-tips-panel">
                <h2>Conseils de Guerre</h2>
                <p class="war-tip-line">Garde une équipe équilibrée et adapte ton style de jeu selon les statistiques de ton adversaire.</p>
            </section>

            <div class="champion-grid">
                <article class="gothic-card">
                    <div class="card-media">
                        <img
                            alt="Dimensional Devourer"
                            src="/images/characters/monsters/boss/dimensional_devourer/dimensional_devourer.png"
                        />
                    </div>
                    <div class="card-body">
                        <div class="card-header">
                            <h3>Dimensional Devourer</h3>
                        </div>
                        <div class="card-stats">
                            <div>
                                <span>HP</span>
                                <strong>2400</strong>
                            </div>
                            <div>
                                <span>ATQ</span>
                                <strong>220</strong>
                            </div>
                            <div>
                                <span>DEF</span>
                                <strong>85</strong>
                            </div>
                            <div>
                                <span>SPD</span>
                                <strong>62</strong>
                            </div>
                            <div>
                                <span>CRIT%</span>
                                <strong>10%</strong>
                            </div>
                            <div>
                                <span>CRIT DMG</span>
                                <strong>x1.8</strong>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="gothic-card">
                    <div class="card-media">
                        <img
                            alt="Deathknight"
                            src="/images/characters/humans/classes/death_knight/death_knight1.png"
                        />
                    </div>
                    <div class="card-body">
                        <div class="card-header">
                            <h3>Deathknight</h3>
                        </div>
                        <div class="card-stats">
                            <div>
                                <span>HP</span>
                                <strong>800</strong>
                            </div>
                            <div>
                                <span>ATQ</span>
                                <strong>150</strong>
                            </div>
                            <div>
                                <span>DEF</span>
                                <strong>60</strong>
                            </div>
                            <div>
                                <span>SPD</span>
                                <strong>50</strong>
                            </div>
                            <div>
                                <span>CRIT%</span>
                                <strong>20%</strong>
                            </div>
                            <div>
                                <span>CRIT DMG</span>
                                <strong>x1.5</strong>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="gothic-card recruit-card">
                    <span class="material-symbols-outlined">add_circle</span>
                    <h3>Recruter</h3>
                    <p>Requiert 2,500 Or</p>
                </article>
            </div>
        </section>
    </div>
</section>

<style>
    :global(.material-symbols-outlined) {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        font-size: 20px;
    }

    .collection-page {
        max-width: 1600px;
        margin: 0 auto;
        padding: 7.5rem var(--page-gutter) 4.5rem;
        color: var(--color-text-body);
        font-family: "Crimson Pro", "Times New Roman", serif;
        position: relative;
        isolation: isolate;
    }

    .collection-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 2rem;
    }

    .collection-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .collection-main {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    @media (min-width: 1024px) {
        .collection-layout {
            grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
            gap: 2rem;
        }
    }

    .panel {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        padding: 2rem;
        position: relative;
        overflow: hidden;
    }

    .dark-gritty-panel {
        background-color: var(--color-surface-base);
        border-left: 3px solid var(--color-border-accent);
        box-shadow: inset 0 0 40px var(--color-overlay-hard), inset 0 0 0 1px var(--color-white-soft), 0 10px 20px var(--color-overlay-medium);
    }

    .panel-glow {
        position: absolute;
        top: -3rem;
        right: -3rem;
        width: 8rem;
        height: 8rem;
        border-radius: var(--radius-pill);
        background: var(--color-overlay-soft);
        filter: blur(24px);
    }

    .panel-title {
        font-family: "Pirata One", "Georgia", serif;
        font-weight: var(--font-weight-regular);
        font-size: 1.75rem;
        color: var(--text-primary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 1.5rem;
        border-bottom: 1px solid var(--color-surface-soft);
        padding-bottom: 0.75rem;
    }

    .panel-stack {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        position: relative;
        z-index: 1;
    }

    .panel-label {
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.55rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        font-weight: var(--font-weight-regular);
    }

    .rank-row {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-top: 0.35rem;
    }

    .stat-value {
        font-family: "Pirata One", "Georgia", serif;
        color: var(--text-danger);
        text-shadow: none;
    }

    .rank-title {
        font-size: 2rem;
    }

    .panel-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
    }

    .panel-cell {
        background: var(--color-overlay-medium);
        border: 1px solid var(--color-surface-base);
        padding: 0.75rem;
    }

    .stat-large {
        font-size: 1.75rem;
    }

    .stat-muted {
        color: var(--color-text-muted);
    }

    .panel-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 0.4rem;
    }

    .stat-medium {
        font-size: 1.25rem;
    }

    .progress {
        width: 100%;
        height: 0.5rem;
        border-radius: var(--radius-pill);
        background: var(--color-text-subtle);
        border: 1px solid var(--color-text-subtle);
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        width: 61.5%;
        background: var(--text-danger);
        box-shadow: none;
    }

    .panel-corner {
        position: absolute;
        width: 1rem;
        height: 1rem;
        border-color: var(--color-border-base);
    }

    .panel-corner.top-left {
        top: 0.5rem;
        left: 0.5rem;
        border-top: 1px solid;
        border-left: 1px solid;
    }

    .panel-corner.bottom-right {
        bottom: 0.5rem;
        right: 0.5rem;
        border-bottom: 1px solid;
        border-right: 1px solid;
    }

    .panel-corner.subtle {
        border-color: var(--color-border-base);
    }

    .inventory-display {
        background-color: var(--color-surface-base);
        box-shadow: inset 0 0 40px var(--color-overlay-hard);
        overflow: visible;
    }

    .inventory-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .inventory-section + .inventory-section {
        margin-top: 2rem;
    }

    .inventory-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-family: "Inter", "Segoe UI", sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.65rem;
        color: var(--color-accent-strong);
        font-weight: var(--font-weight-regular);
    }

    .inventory-header h3 {
        margin: 0;
        font-weight: var(--font-weight-regular);
    }

    .inventory-header span {
        color: var(--color-text-muted);
        letter-spacing: 0.1em;
        font-size: 0.55rem;
        font-weight: var(--font-weight-regular);
    }

    .inventory-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.5rem;
        overflow: visible;
    }

    .inventory-slot-view {
        aspect-ratio: 1 / 1;
        background: var(--color-overlay-medium);
        border: 1px solid var(--color-text-subtle);
        box-shadow: inset 0 0 8px var(--color-overlay-medium);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: var(--color-surface-base);
        font-size: 1.4rem;
        overflow: visible;
        z-index: 1;
    }

    .inventory-slot-view.has-tooltip {
        cursor: help;
    }

    .inventory-slot-view.has-tooltip:hover {
        z-index: 20;
    }

    .inventory-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }

    .inventory-tooltip {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 0.45rem);
        transform: translate(-50%, 6px);
        width: max-content;
        max-width: 14rem;
        padding: 0.45rem 0.55rem;
        border: 1px solid var(--color-border-base);
        background: var(--color-surface-soft);
        box-shadow: 0 10px 20px var(--shadow-soft-color);
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.14s ease, transform 0.14s ease, visibility 0.14s ease;
        z-index: 30;
    }

    .inventory-tooltip::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        width: 0.5rem;
        height: 0.5rem;
        background: var(--color-surface-soft);
        border-right: 1px solid var(--color-border-base);
        border-bottom: 1px solid var(--color-border-base);
        transform: translateX(-50%) rotate(45deg);
    }

    .inventory-tooltip-name {
        margin: 0;
        color: var(--color-white);
        font-family: "Pirata One", "Georgia", serif;
        font-size: 0.84rem;
        letter-spacing: 0.04em;
    }

    .inventory-tooltip-desc {
        margin: 0.25rem 0 0;
        color: var(--color-text-body);
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.66rem;
        line-height: 1.3;
    }

    .inventory-slot-view.has-tooltip:hover .inventory-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
    }

    .slot-count {
        position: absolute;
        bottom: 0.15rem;
        right: 0.35rem;
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.6rem;
        font-weight: var(--font-weight-bold);
        color: var(--text-danger);
    }

    .slot-count.muted {
        color: var(--color-text-muted);
    }
    .collection-hero {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        align-items: center;
        justify-content: space-between;
        background: var(--color-surface-soft);
        padding: 1.5rem;
        border: 1px solid var(--color-border-accent);
        border-radius: var(--radius-sm);
        box-shadow: 0 14px 30px var(--shadow-panel-color), inset 0 0 0 1px var(--color-white-soft);
    }

    .collection-hero h1 {
        font-family: "Pirata One", "system-ui";
        font-size: 2.2rem;
        font-weight: var(--font-weight-regular);
        text-transform: uppercase;
        letter-spacing: 0.24rem;
        color: var(--text-primary);
        margin: 0 0 0.5rem;
    }

    .collection-hero p {
        font-size: 0.8rem;
        color: var(--color-text-muted);
        font-style: italic;
        margin: 0;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .ornate-button-action {
        position: relative;
        background: var(--color-surface-base);
        border: 2px solid var(--text-accent);
        box-shadow: 0 10px 20px var(--shadow-panel-color);
        color: var(--color-white);
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.05rem;
        letter-spacing: 0.12em;
        padding: 1rem 2rem;
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }

    .hero-actions .button-icon {
        color: var(--text-accent);
        transition: transform 0.3s ease;
        font-size: 1.4rem;
    }

    .ornate-button-action:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 22px var(--shadow-panel-color);
    }

    .ornate-button-action:hover .button-icon {
        transform: scale(1.1);
    }

    .pvp-glow {
        box-shadow: 0 12px 22px var(--shadow-panel-color);
        border-color: var(--text-danger);
        background: var(--color-surface-base);
    }

    .pvp-glow .button-icon {
        color: var(--text-danger);
    }

    .pvp-glow:hover .button-icon {
        transform: rotate(12deg);
    }

    .champion-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1.1rem;
    }

    .insight-panel {
        background: var(--color-surface-base);
        border: 1px solid var(--color-surface-base);
        padding: 1.25rem;
        box-shadow: inset 0 0 25px var(--shadow-panel-color);
    }

    .insight-panel h2 {
        font-family: "Pirata One", "Georgia", serif;
        font-weight: var(--font-weight-regular);
        color: var(--color-white);
        font-size: 1.45rem;
        margin: 0 0 1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .war-tip-line {
        margin: 0;
        color: var(--color-text-body);
        font-family: "Crimson Pro", "Times New Roman", serif;
        font-size: 1.1rem;
        line-height: 1.45;
        font-style: italic;
    }

    .gothic-card {
        background: var(--color-surface-base);
        border: 1px solid var(--ui-border-strong);
        box-shadow: inset 0 0 0 1px var(--color-white-soft), 0 8px 16px var(--shadow-soft-color);
        overflow: hidden;
        transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
        cursor: pointer;
        position: relative;
    }

    .gothic-card:hover {
        border-color: var(--color-danger);
        background: var(--color-surface-base);
        transform: translateY(-1px);
        box-shadow: inset 0 0 0 1px var(--color-white-soft), 0 10px 18px var(--shadow-panel-color);
    }

    .card-media {
        position: relative;
        height: 13.6rem;
        background: var(--color-surface-base);
        overflow: hidden;
    }

    .card-media img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center top;
        opacity: 1;
        transition: transform 0.25s ease;
        filter: contrast(1.1) brightness(0.9);
    }

    .gothic-card:hover .card-media img {
        transform: scale(1.015);
    }

    .card-body {
        padding: 0.72rem 0.95rem;
        border-top: 1px solid var(--ui-border);
    }

    .card-header {
        margin-bottom: 0.58rem;
    }

    .card-header h3 {
        font-family: "Pirata One", "Georgia", serif;
        font-weight: var(--font-weight-regular);
        color: var(--color-white);
        font-size: clamp(1.2rem, 2.4vw, 1.38rem);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        margin: 0;
    }

    .card-body p {
        color: var(--color-text-muted);
        font-size: 0.75rem;
        font-style: italic;
        margin: 0 0 1rem;
    }

    .card-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.45rem;
    }

    .card-stats > div {
        border: 1px solid var(--color-border-base);
        background: var(--color-surface-base);
        padding: 0.5rem;
    }

    .card-stats span {
        display: block;
        color: var(--color-accent-soft);
        font-size: 0.64rem;
        text-transform: uppercase;
        letter-spacing: 0.17em;
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    .card-stats strong {
        display: block;
        margin-top: 0.18rem;
        font-family: "Pirata One", system-ui;
        color: var(--text-primary);
        font-size: 1.03rem;
    }

    .recruit-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        padding: 2.5rem 2rem;
        color: var(--color-text-muted);
        text-align: center;
        opacity: 0.6;
        filter: grayscale(1);
        transition: opacity 0.3s ease, filter 0.3s ease;
    }

    .recruit-card:hover {
        opacity: 1;
        filter: grayscale(0);
    }

    .recruit-card span {
        font-size: 3rem;
    }

    .recruit-card h3 {
        font-family: "Pirata One", "Georgia", serif;
        font-weight: var(--font-weight-regular);
        font-size: 1.5rem;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.2em;
    }

    .recruit-card p {
        margin: 0;
        font-size: 0.65rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    @media (max-width: 900px) {
        .collection-page {
            padding-top: 6.5rem;
        }

        .collection-hero h1 {
            font-size: 2rem;
        }

        .hero-actions {
            width: 100%;
        }

        .ornate-button-action {
            width: 100%;
            justify-content: center;
        }

        .champion-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
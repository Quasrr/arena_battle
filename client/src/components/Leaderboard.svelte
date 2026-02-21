<script>
    import { setAuth } from "../assets/scripts/store/auth.svelte.js";

    let { gameState = $bindable() } = $props();
</script>

<section class="leaderboard-page">
    <div class="leaderboard-layout">
        <section class="leaderboard-main">
            <header class="leaderboard-header">
                <h1>Panthéon de la gloire</h1>
                <p>Le Sang écrit l'Histoire des Braves</p>
                <div class="header-divider"></div>
            </header>

            <div class="leaderboard-tabs">
                <button class="tab-active">Classement des Joueurs</button>
                <button>Classement des Champions</button>
            </div>

            <div class="leaderboard-table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="col-rank">Rang</th>
                            <th class="col-warrior">Guerrier</th>
                            <th class="col-champion">Main Champion</th>
                            <th class="col-mmr">MMR</th>
                            <th class="col-ratio">Ratio V/D</th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
                        <tr class="leaderboard-row">
                            <td>
                                <div class="rank-cell">
                                    <span class="material-symbols-outlined gold">workspace_premium</span>
                                    <span class="stat-value stat-4xl gold">1</span>
                                </div>
                            </td>
                            <td>
                                <div class="warrior-name">demo</div>
                            </td>
                            <td>
                                <div class="champion-cell">
                                    <div class="champion-thumb gold-border">
                                        <img
                                            alt="Champion"
                                            src="/images/characters/monsters/boss/dimensional_devourer/avatars/dimensional_devourer.png"
                                        />
                                    </div>
                                    <span class="champion-name">Dimentional Devourer</span>
                                </div>
                            </td>
                            <td class="center">
                                <span class="stat-value mmr">2,850</span>
                            </td>
                            <td class="right">
                                <div class="ratio-cell">
                                    <span class="victory-text">412 V</span>
                                    <span class="divider">|</span>
                                    <span class="defeat-text">88 D</span>
                                </div>
                            </td>
                        </tr>
                        <tr class="leaderboard-row">
                            <td>
                                <div class="rank-cell">
                                    <span class="material-symbols-outlined silver">workspace_premium</span>
                                    <span class="stat-value stat-3xl silver">2</span>
                                </div>
                            </td>
                            <td>
                                <div class="warrior-name muted">demo</div>
                            </td>
                            <td>
                                <div class="champion-cell">
                                    <div class="champion-thumb silver-border">
                                        <img
                                            alt="Champion"
                                            src="/images/characters/humans/classes/death_knight/avatars/deathknight_avatar.png"
                                        />
                                    </div>
                                    <span class="champion-name muted">Deathknight</span>
                                </div>
                            </td>
                            <td class="center">
                                <span class="stat-value mmr muted">2,710</span>
                            </td>
                            <td class="right">
                                <div class="ratio-cell muted">
                                    <span class="victory-text muted">385 V</span>
                                    <span class="divider">|</span>
                                    <span class="defeat-text muted">112 D</span>
                                </div>
                            </td>
                        </tr>
                        <tr class="leaderboard-row">
                            <td>
                                <div class="rank-cell">
                                    <span class="material-symbols-outlined bronze">workspace_premium</span>
                                    <span class="stat-value stat-3xl bronze">3</span>
                                </div>
                            </td>
                            <td>
                                <div class="warrior-name muted">demo</div>
                            </td>
                            <td>
                                <div class="champion-cell">
                                    <div class="champion-thumb silver-border">
                                        <img
                                            alt="Champion"
                                            src="/images/characters/monsters/boss/baron/avatars/baron_avatar.png"
                                        />
                                    </div>
                                    <span class="champion-name muted">Baron</span>
                                </div>
                            </td>
                            <td class="center">
                                <span class="stat-value mmr muted">2,640</span>
                            </td>
                            <td class="right">
                                <div class="ratio-cell muted">
                                    <span class="victory-text muted">310 V</span>
                                    <span class="divider">|</span>
                                    <span class="defeat-text muted">95 D</span>
                                </div>
                            </td>
                        </tr>
                        <tr class="leaderboard-row">
                            <td>
                                <div class="rank-cell plain">
                                    <span class="stat-value stat-3xl plain">4</span>
                                </div>
                            </td>
                            <td>
                                <div class="warrior-name dim">demo</div>
                            </td>
                            <td>
                                <div class="champion-cell">
                                    <div class="champion-thumb dim-border">
                                        <img
                                            alt="Champion"
                                            src="/images/characters/monsters/boss/baron/avatars/baron_avatar.png"
                                        />
                                    </div>
                                    <span class="champion-name dim">Baron</span>
                                </div>
                            </td>
                            <td class="center">
                                <span class="stat-value mmr dim">2,490</span>
                            </td>
                            <td class="right">
                                <div class="ratio-cell dim">
                                    <span class="neutral">280 V</span>
                                    <span class="divider dim">|</span>
                                    <span class="loss">132 D</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="leaderboard-footer">
                    <button>Sonder les profondeurs (Afficher plus)</button>
                </div>
            </div>
        </section>
    </div>
</section>

<style>
    :global(.material-symbols-outlined) {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
    }

    :global(:root) {
        --primary-blood: var(--text-danger);
        --primary-blood-strong: var(--color-danger);
        --gold: var(--text-accent);
        --charcoal: var(--color-surface-base);
        --dark-stone: var(--color-surface-base);
        --bone: var(--color-white);
        --divider-red: var(--color-danger);
        --divider-gold: var(--color-text-subtle);
        --stone-400: var(--color-text-muted);
        --stone-500: var(--color-text-muted);
        --stone-600: var(--color-text-muted);
        --stone-700: var(--color-text-subtle);
        --stone-800: var(--color-text-subtle);
        --stone-300: var(--color-text-body);
        --stone-200: var(--color-white);
    }

    .leaderboard-page {
        max-width: 1600px;
        margin: 0 auto;
        padding: 7rem 1.5rem 3rem;
        font-family: "Crimson Pro", "Times New Roman", serif;
        color: var(--bone);
        position: relative;
        isolation: isolate;
    }

    .leaderboard-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 2rem;
    }

    .leaderboard-main {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .leaderboard-header {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .leaderboard-header h1 {
        font-family: "Pirata One", "Georgia", serif;
        font-size: 3.75rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        margin: 0 0 0.5rem;
        color: var(--bone);
        text-shadow: 0 20px 30px var(--color-overlay-medium);
    }

    .leaderboard-header p {
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--gold);
        opacity: 0.8;
        margin: 0;
    }

    .header-divider {
        height: 1px;
        width: 16rem;
        background: linear-gradient(90deg, transparent, var(--primary-blood), transparent);
        margin: 1.5rem auto 0;
    }

    .leaderboard-tabs {
        display: flex;
        border-bottom: 1px solid var(--color-border-accent);
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        margin-bottom: 2rem;
    }

    .leaderboard-tabs button {
        background: var(--color-surface-base);
        border: 1px solid transparent;
        color: var(--stone-500);
        padding: 1rem 2rem;
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        font: inherit;
        border-bottom: 2px solid transparent;
    }

    .leaderboard-tabs button:hover {
        color: var(--gold);
        border-color: var(--color-border-accent);
        border-bottom-color: var(--gold);
        background: var(--color-surface-base);
    }

    .leaderboard-tabs .tab-active {
        color: var(--gold);
        border-color: var(--color-border-accent);
        border-bottom: 2px solid var(--gold);
        background: var(--color-surface-base);
    }

    .leaderboard-table-container {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        overflow: hidden;
        box-shadow: 0 16px 34px var(--shadow-panel-color), inset 0 0 0 1px var(--color-white-soft);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        color: var(--stone-400);
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    thead tr {
        background: var(--color-overlay-medium);
        border-bottom: 1px solid var(--primary-blood);
    }

    th {
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.125rem;
        color: var(--gold);
        padding: 1.25rem 1.5rem;
        vertical-align: middle;
    }

    td {
        padding: 1.25rem 1.5rem;
        vertical-align: middle;
    }

    .table-body {
        color: var(--stone-400);
    }

    .col-rank {
        width: 5rem;
    }

    .col-warrior {
        width: 33.333%;
    }

    thead th.col-warrior,
    tbody td:nth-child(2) {
        padding-left: 2.25rem;
    }

    .col-champion {
        width: 25%;
    }

    .col-mmr {
        width: 6rem;
        text-align: center;
    }

    .col-ratio {
        text-align: right;
    }

    .leaderboard-row {
        background-color: transparent;
        border-bottom: 1px solid var(--divider-gold);
        transition: background-color 0.3s ease;
    }

    .leaderboard-row:last-child {
        border-bottom: none;
    }

    .leaderboard-row:hover {
        background-color: var(--color-surface-base);
    }

    .rank-cell {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .rank-cell.plain {
        padding-left: 1rem;
    }

    .rank-cell .material-symbols-outlined {
        font-size: 1.5rem;
    }

    .stat-value {
        font-family: "Pirata One", "Georgia", serif;
        line-height: 1;
        color: var(--primary-blood-strong) !important;
        text-shadow: none;
    }

    .stat-value.gold,
    .rank-cell .gold {
        color: var(--gold);
    }

    .stat-value.silver,
    .rank-cell .silver {
        color: var(--stone-500);
    }

    .stat-value.bronze,
    .rank-cell .bronze {
        color: var(--color-text-muted);
    }

    .stat-value.plain {
        color: var(--stone-700);
    }

    .stat-4xl {
        font-size: 2.25rem;
    }

    .stat-3xl {
        font-size: 1.875rem;
    }

    .warrior-name {
        padding-left: 0;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.5rem;
        color: var(--bone);
        line-height: 1.1;
    }

    .warrior-name.muted {
        color: var(--stone-200);
    }

    .warrior-name.dim {
        color: var(--stone-400);
    }

    .champion-cell {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .champion-thumb {
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid var(--color-text-subtle);
        padding: 0.125rem;
        background: var(--color-black);
        overflow: hidden;
    }

    .champion-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .champion-thumb.gold-border {
        border-color: var(--gold);
    }

    .champion-thumb.silver-border {
        border-color: var(--stone-500);
    }

    .champion-thumb.dim-border {
        border-color: var(--stone-800);
    }

    .champion-name {
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-text-body);
        font-weight: var(--font-weight-bold);
    }

    .champion-name.muted {
        color: var(--stone-500);
    }

    .champion-name.dim {
        color: var(--stone-600);
    }

    .center {
        text-align: center;
    }

    .right {
        text-align: right;
    }

    .mmr {
        font-size: 1.875rem;
        color: var(--bone);
    }

    .mmr.muted {
        color: var(--stone-300);
    }

    .mmr.dim {
        color: var(--stone-700);
    }

    .ratio-cell {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75rem;
        font-size: 0.875rem;
    }

    .ratio-cell .divider {
        color: var(--stone-600);
    }

    .ratio-cell .divider.dim {
        color: var(--stone-800);
    }

    .ratio-cell.muted {
        opacity: 0.7;
    }

    .ratio-cell.dim {
        color: var(--stone-500);
    }

    .ratio-cell .neutral {
        color: var(--stone-500);
        font-weight: var(--font-weight-bold);
    }

    .ratio-cell .loss {
        color: var(--color-danger);
        font-weight: var(--font-weight-bold);
    }

    .victory-text {
        color: var(--bone);
        font-weight: var(--font-weight-bold);
    }

    .defeat-text {
        color: var(--primary-blood);
        font-weight: var(--font-weight-bold);
    }

    .leaderboard-footer {
        background: linear-gradient(180deg, color-mix(in srgb, var(--color-overlay-medium) 60%, transparent), var(--color-overlay-soft));
        border-top: 1px solid var(--color-border-accent);
        padding: 1.5rem;
        text-align: center;
    }

    .leaderboard-footer button {
        background: transparent;
        border: none;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.25rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--stone-500);
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .leaderboard-footer button:hover {
        color: var(--gold);
    }

    @media (max-width: 900px) {
        .leaderboard-page {
            padding-top: 6.5rem;
        }

        .leaderboard-header h1 {
            font-size: 2.6rem;
        }

        .leaderboard-header p {
            font-size: 1.1rem;
        }

        .leaderboard-tabs {
            flex-direction: column;
            gap: 0.5rem;
        }

        .leaderboard-tabs button {
            padding: 1rem 0;
        }

        table,
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
        }

        thead {
            display: none;
        }

        td {
            padding: 0.8rem 1.2rem;
        }

        .leaderboard-row {
            border-bottom: 1px solid var(--stone-800);
        }

        .right,
        .center {
            text-align: left;
        }

        .ratio-cell {
            justify-content: flex-start;
        }
    }
</style>
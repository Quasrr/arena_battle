<script>
    import { authUser } from "../assets/scripts/store/auth.svelte.js";

    let { gameState = $bindable() } = $props();

    const profile = $derived({
        username: authUser.username,
        avatar: "/images/characters/humans/classes/death_knight/avatars/deathknight_avatar.png",
        mmr: 2999,
        season: "Saison de l'Angoisse",
        lastConnection: "Aujourd'hui a 14:12",
        accountAge: "8 mois",
        favoriteChampion: "DeathKnight",
        battleCount: 231,
        wins: 142,
        losses: 89,
        currentStreak: 4,
        bestStreak: 11,
        totalDamage: 418720,
        totalDamageTaken: 391144,
        critRate: 27,
    });

    const recentBattles = [
        {
            result: "Victoire",
            opponent: "demo",
            champion: "DeathKnight",
            duration: "07:41",
            date: "Aujourd'hui, 13:28",
            mmrDelta: "+24",
        },
        {
            result: "Defaite",
            opponent: "DukeNoir",
            champion: "DeathKnight",
            duration: "05:52",
            date: "Aujourd'hui, 10:11",
            mmrDelta: "-18",
        },
        {
            result: "Victoire",
            opponent: "LysTheBlade",
            champion: "Dimensional Devourer",
            duration: "09:03",
            date: "Hier, 22:49",
            mmrDelta: "+19",
        },
        {
            result: "Victoire",
            opponent: "Ashmon",
            champion: "Baron",
            duration: "08:14",
            date: "Hier, 19:30",
            mmrDelta: "+17",
        },
    ];

    let winRate = $derived(Math.round((profile.wins / (profile.wins + profile.losses)) * 100));
</script>

<section class="profile-page">
    <header class="profile-header">
        <p class="profile-kicker">Fiche du combattant</p>
        <h1>Profil de {profile.username}</h1>
        <p class="profile-subtitle">
            Suivi du classement, progression de saison, historique des duels et
            performances en arene.
        </p>
    </header>

    <div class="profile-layout">
        <aside class="profile-sidebar">
            <article class="panel identity-card">
                <div class="avatar-wrap">
                    <img src={profile.avatar} alt={`Avatar de ${profile.username}`} />
                </div>
                <h2>{profile.username}</h2>
                <div class="meta-list">
                    <p><span>Derniere connexion</span>{profile.lastConnection}</p>
                    <p><span>Anciennete</span>{profile.accountAge}</p>
                </div>
            </article>

            <article class="panel rank-card">
                <h3>Classement</h3>
                <div class="rank-main">
                    <p class="mmr">{profile.mmr}</p>
                    <span>MMR</span>
                </div>
                <p class="season">{profile.season}</p>
            </article>
        </aside>

        <section class="profile-main">
            <article class="panel stats-grid-card">
                <h3>Statistiques generales</h3>
                <div class="stats-grid">
                    <div>
                        <span>Combats</span>
                        <strong>{profile.battleCount}</strong>
                    </div>
                    <div>
                        <span>Victoires</span>
                        <strong>{profile.wins}</strong>
                    </div>
                    <div>
                        <span>Defaites</span>
                        <strong>{profile.losses}</strong>
                    </div>
                    <div>
                        <span>Win Rate</span>
                        <strong>{winRate}%</strong>
                    </div>
                    <div>
                        <span>Serie en cours</span>
                        <strong>{profile.currentStreak}</strong>
                    </div>
                    <div>
                        <span>Meilleure serie</span>
                        <strong>{profile.bestStreak}</strong>
                    </div>
                    <div>
                        <span>Degats infliges</span>
                        <strong>{profile.totalDamage}</strong>
                    </div>
                    <div>
                        <span>Degats recus</span>
                        <strong>{profile.totalDamageTaken}</strong>
                    </div>
                    <div>
                        <span>Taux de critique</span>
                        <strong>{profile.critRate}%</strong>
                    </div>
                    <div>
                        <span>Champion favori</span>
                        <strong>{profile.favoriteChampion}</strong>
                    </div>
                </div>
            </article>

            <article class="panel history-card">
                <div class="history-head">
                    <h3>Historique de combat</h3>
                    <button type="button">Voir tous les duels</button>
                </div>
                <div class="history-table-wrap">
                    <table class="history-table">
                        <thead>
                            <tr>
                                <th>Resultat</th>
                                <th>Adversaire</th>
                                <th>Champion</th>
                                <th>Duree</th>
                                <th>Date</th>
                                <th class="is-right">MMR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each recentBattles as battle}
                                <tr>
                                    <td>
                                        <span class="result" class:is-win={battle.result === "Victoire"}>
                                            {battle.result}
                                        </span>
                                    </td>
                                    <td>{battle.opponent}</td>
                                    <td>{battle.champion}</td>
                                    <td>{battle.duration}</td>
                                    <td>{battle.date}</td>
                                    <td class="is-right">
                                        <span class="delta" class:is-pos={battle.mmrDelta.startsWith("+")}>
                                            {battle.mmrDelta}
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    </div>
</section>

<style>
    .profile-page {
        --surface-main: var(--surface-1);
        --surface-soft: var(--color-surface-base);
        --red-line: var(--ui-border);
        --panel-depth: var(--color-overlay-soft);
        max-width: 1600px;
        margin: 0 auto;
        padding: 7.5rem var(--page-gutter) 4.5rem;
        color: var(--color-white);
        font-family: "Crimson Pro", "Times New Roman", serif;
        position: relative;
        isolation: isolate;
    }

    .profile-header {
        margin-bottom: 1.5rem;
    }

    .profile-kicker {
        margin: 0 0 0.45rem;
        color: var(--color-accent-strong);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.64rem;
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    .profile-header h1 {
        margin: 0;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: clamp(2rem, 4vw, 3.4rem);
        color: var(--text-primary);
    }

    .profile-subtitle {
        margin-top: 0.6rem;
        max-width: 52rem;
        color: var(--text-body-soft);
        line-height: 1.45;
    }

    .profile-layout {
        display: grid;
        grid-template-columns: minmax(18rem, 24rem) minmax(0, 1fr);
        gap: 1.3rem;
        align-items: start;
    }

    .profile-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .profile-main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .panel {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        box-shadow: 0 10px 22px var(--panel-depth), inset 0 0 0 1px var(--color-white-soft);
        padding: 1rem;
    }

    .identity-card {
        text-align: center;
    }

    .avatar-wrap {
        width: 6.5rem;
        height: 6.5rem;
        margin: 0 auto 0.7rem;
        border: 1px solid var(--ui-border);
        background: var(--color-overlay-strong);
        overflow: hidden;
    }

    .avatar-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .identity-card h2 {
        margin: 0;
        font-family: "Pirata One", system-ui;
        font-size: 1.75rem;
        letter-spacing: 0.05em;
        color: var(--text-primary);
    }

    .meta-list {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        text-align: left;
    }

    .meta-list p {
        margin: 0;
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        border: 1px solid var(--ui-border);
        background: var(--color-surface-base);
        padding: 0.48rem 0.55rem;
        font-size: 0.9rem;
        box-shadow: inset 0 0 0 1px var(--color-white-soft);
    }

    .meta-list span {
        color: var(--color-accent-soft);
        text-transform: uppercase;
        letter-spacing: 0.09em;
        font-size: 0.62rem;
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    .rank-card h3,
    .stats-grid-card h3,
    .history-card h3 {
        margin: 0 0 0.75rem;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-primary);
        font-size: 1.25rem;
        padding-bottom: 0.45rem;
        border-bottom: 1px solid var(--ui-border);
    }

    .rank-main {
        text-align: center;
        border: 1px solid var(--ui-border);
        background: var(--color-surface-base);
        padding: 0.7rem;
        box-shadow: inset 0 0 0 1px var(--color-white-soft);
    }

    .rank-main .mmr {
        margin: 0;
        font-family: "Pirata One", system-ui;
        color: var(--text-danger);
        font-size: 2.3rem;
        line-height: 1;
        text-shadow: none;
    }

    .rank-main span {
        color: var(--text-muted);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    .season {
        margin: 0.65rem 0 0;
        color: var(--text-body-soft);
        font-style: italic;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 0.5rem;
    }

    .stats-grid div {
        border: 1px solid var(--ui-border);
        background: var(--color-surface-base);
        padding: 0.56rem;
        min-height: 4.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-shadow: inset 0 0 0 1px var(--color-white-soft);
    }

    .stats-grid span {
        color: var(--color-accent-strong);
        font-size: 0.58rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    .stats-grid strong {
        margin-top: 0.2rem;
        color: var(--text-primary);
        font-family: "Pirata One", system-ui;
        font-size: 1.15rem;
    }

    .history-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }

    .history-head button {
        border: 1px solid var(--ui-border);
        background: var(--color-surface-base);
        color: var(--text-primary);
        padding: 0.42rem 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.6rem;
        font-family: "Inter", "Segoe UI", sans-serif;
        cursor: pointer;
    }

    .history-head button:hover {
        border-color: var(--color-border-accent);
        color: var(--color-accent-strong);
    }

    .history-table-wrap {
        overflow-x: auto;
    }

    .history-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 760px;
        font-family: "Inter", "Segoe UI", sans-serif;
    }

    .history-table thead tr {
        border-bottom: 1px solid var(--color-border-accent);
    }

    .history-table th {
        text-align: left;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-size: 0.6rem;
        padding: 0.55rem 0.35rem;
        font-weight: var(--font-weight-semibold);
        background: var(--color-surface-base);
    }

    .history-table td {
        padding: 0.6rem 0.35rem;
        color: var(--color-white);
        border-bottom: 1px solid var(--ui-border);
        font-size: 0.82rem;
    }

    .history-table tbody tr:hover {
        background: var(--color-surface-base);
    }

    .is-right {
        text-align: right;
    }

    .result {
        border: 1px solid var(--color-danger);
        color: var(--color-danger);
        background: var(--color-danger-faint);
        padding: 0.2rem 0.42rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.62rem;
    }

    .result.is-win {
        border-color: var(--color-success);
        color: var(--color-success);
        background: var(--color-success-soft);
    }

    .delta {
        color: var(--color-danger);
        font-weight: var(--font-weight-bold);
    }

    .delta.is-pos {
        color: var(--color-success);
    }

    @media (max-width: 1200px) {
        .stats-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (max-width: 1024px) {
        .profile-layout {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 700px) {
        .profile-page {
            padding-top: 6.8rem;
        }

        .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
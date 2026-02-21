<script>
    import { onDestroy, onMount } from "svelte";
    import { initAuth, logoutUser } from "./assets/scripts/services/auth.service.js";
    import { authUser } from "./assets/scripts/store/auth.svelte.js";
    import { storeCsrfToken } from "./assets/scripts/services/csrf.service";
    import Login from "./components/Login.svelte";
    import Register from "./components/Register.svelte";
    import Fight from "./components/Fight.svelte";
    import CharacterSelection from "./components/CharacterSelection.svelte";
    import Bestiary from "./components/Bestiary.svelte";
    import Leaderboard from "./components/Leaderboard.svelte";
    import Collection from "./components/Collection.svelte";
    import Marketplace from "./components/Marketplace.svelte";
    import About from "./components/About.svelte";
    import Profil from "./components/Profil.svelte";
    import Messages from "./components/Messages.svelte";

    let gameState = $state(localStorage.getItem("gameState") || "home");
    let profileMenuOpen = $state(false);
    let authReady = $state(false);

    onMount(async () => {
        document.addEventListener("click", handleDocumentClick);

        await storeCsrfToken();

        await initAuth();

        if (gameState === "fight") {
            if (!authUser.username) {
                setStorage("login");
            } else if (!authUser.currentBattle) {
                setStorage("character-selection");
            }
        }
        
        authReady = true;
    });

    onDestroy(() => {
        document.removeEventListener("click", handleDocumentClick);
    });

    function toggleProfileMenu(event) {
        event.stopPropagation();
        profileMenuOpen = !profileMenuOpen;
    }

    function closeProfileMenu() {
        profileMenuOpen = false;
    }

    function handleDocumentClick() {
        if (profileMenuOpen) {
            profileMenuOpen = false;
        }
    }

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

    async function logout() {
        await logoutUser();

        window.location.reload();
    }
</script>

<header class="site-header">
    <div class="brand" style="cursor: pointer;" onclick={() => { setStorage('home') }}>
        <span class="header-logo">ARENA BATTLE</span>
    </div>
    <nav class="main-nav">
        <ul>
            <li><button class="nav-link" onclick={() => { authUser.username ? setStorage('collection') : setStorage('register') }}> { authUser.username ? "Ma Collection" : "Jouer" }</button></li>
            <li><button class="nav-link" onclick={() => { setStorage('bestiary') }}>Bestiaire</button></li>
            <li><button class="nav-link" onclick={() => { setStorage('leaderboard') }}>Classement</button></li>
            <li><button class="nav-link" onclick={() => { setStorage('marketplace') }}>Marketplace</button></li>
            <li><button class="nav-link" onclick={() => { setStorage('about') }}>À propos</button></li>
            
        </ul>
    </nav>
    <div class="header-actions">
        {#if authUser.username}
            <div class="profile-menu" onclick={(event) => event.stopPropagation()}>
                <button
                    class="icon-button"
                    title="Profil"
                    onclick={toggleProfileMenu}
                >
                    <span class="profile-trigger-label">Profil</span>
                    <span class="material-symbols-outlined profile-trigger-caret">keyboard_arrow_down</span>
                </button>
                {#if profileMenuOpen}
                    <div class="profile-dropdown" role="menu">
                        <div class="profile-name-wrap">
                            <p class="profile-section-label">Identité</p>
                            <div class="profile-identity-row">
                                <p class="profile-name">{authUser.username}</p>
                                <span class="profile-gold">
                                    <span class="material-symbols-outlined">monetization_on</span>
                                    14,250 Or
                                </span>
                            </div>
                        </div>
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={() => {
                                closeProfileMenu();
                                setStorage("profile");
                            }}
                        >
                            <span class="material-symbols-outlined menu-item-icon">account_circle</span>
                            <span class="menu-item-text">Mon Profil</span>
                        </button>
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={() => {
                                closeProfileMenu();
                                setStorage("messages");
                            }}
                        >
                            <span class="material-symbols-outlined menu-item-icon">mail</span>
                            <span class="menu-item-text">Messages</span>
                        </button>
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={closeProfileMenu}
                        >
                            <span class="material-symbols-outlined menu-item-icon">settings</span>
                            <span class="menu-item-text">Paramètres</span>
                        </button>
                        <button
                            class="menu-item danger"
                            role="menuitem"
                            onclick={logout}
                        >
                            <span class="material-symbols-outlined menu-item-icon">logout</span>
                            <span class="menu-item-text">Déconnexion</span>
                        </button>
                    </div>
                {/if}
            </div>
        {:else}
            <div class="header-auth">
                <button
                    class="header-auth-button"
                    onclick={() => setStorage('login')}
                >
                    Se connecter
                </button>
                <button
                    class="header-auth-button header-auth-button-primary"
                    onclick={() => setStorage('register')}
                >
                    S'enregistrer
                </button>
            </div>
        {/if}
    </div>
</header>

{#if authReady}
    {#if gameState === "home"}
        <section class="home home-landing">
            <div class="hero hero-landing">
                <div class="hero-inner">
                    <div class="hero-text">
                        <div class="hero-kicker">
                            <span class="hero-kicker-line"></span>
                            <p class="hero-eyebrow">Saison de l'Angoisse</p>
                        </div>
                        <h1>Des duels <br> tactiques au <br> <span>tour par tour</span></h1>
                        <p class="hero-subtitle">
                            Choisissez un champion, affrontez en un autre, et adaptez votre
                            stratégie à chaque tour
                        </p>
                        <button class="arena-button" type="button">
                            <span class="arena-button-ember"></span>

                            <span class="arena-button-corner arena-button-corner-tl"></span>
                            <span class="arena-button-corner arena-button-corner-tr"></span>
                            <span class="arena-button-corner arena-button-corner-bl"></span>
                            <span class="arena-button-corner arena-button-corner-br"></span>

                            <span class="material-symbols-outlined arena-button-icon arena-button-icon-left">swords</span>
                            <span class="arena-button-label">ENTRER DANS L'ARÈNE</span>
                            <span class="material-symbols-outlined arena-button-icon arena-button-icon-right">swords</span>
                        </button>
                    </div>
                    <div class="hero-visual">
                        <img src="/images/characters2.png" alt="Champions Arena Battle" />
                    </div>
                </div>
            </div>

            <div class="feature-grid feature-grid-landing">
                <article class="feature-card feature-card-landing">
                    <span class="feature-card-topline"></span>
                    <div class="feature-card-icon">
                        <span class="material-symbols-outlined">person_search</span>
                        <span class="feature-card-divider"></span>
                    </div>
                    <h2>Choisissez votre champion</h2>
                    <p>
                        Chaque combattant a ses statistiques, ses compétences et
                        ses effets (buffs/debuffs).
                    </p>
                </article>
                <article class="feature-card feature-card-landing">
                    <span class="feature-card-topline"></span>
                    <div class="feature-card-icon">
                        <span class="material-symbols-outlined">hourglass_bottom</span>
                        <span class="feature-card-divider"></span>
                    </div>
                    <h2>Combattez tour par tour</h2>
                    <p>
                        Attaque, défense, compétences : chaque décision compte.
                    </p>
                </article>
                <article class="feature-card feature-card-landing">
                    <span class="feature-card-topline"></span>
                    <div class="feature-card-icon">
                        <span class="material-symbols-outlined">history_edu</span>
                        <span class="feature-card-divider"></span>
                    </div>
                    <h2>Analysez et progressez</h2>
                    <p>
                        Consultez le journal de combat et améliorez votre maîtrise.
                    </p>
                </article>
            </div>            <section class="glory">
                <div class="glory-header">
                    <div class="glory-title">
                        <h2>PANTHÉON DE LA GLOIRE</h2>
                        <p>"Le sang écrit l'histoire des braves"</p>
                    </div>
                    <div class="glory-tabs">
                        <button class="glory-tab is-active">Classement des Joueurs</button>
                        <button class="glory-tab">Classement des Champions</button>
                    </div>
                </div>
                <div class="glory-table">
                    <table class="glory-table-grid">
                        <thead class="glory-table-head">
                            <tr class="glory-row">
                                <th>Rang</th>
                                <th>Guerrier</th>
                                <th>Main Champion</th>
                                <th>MMR</th>
                                <th class="is-right">Ratio V/D</th>
                            </tr>
                        </thead>
                        <tbody class="glory-table-body">
                            <tr class="glory-row">
                                <td>
                                    <div class="glory-rank-cell">
                                        <span class="material-symbols-outlined glory-rank-icon is-gold">workspace_premium</span>
                                        <span class="glory-rank is-gold">1</span>
                                    </div>
                                </td>
                                <td><div class="glory-warrior">demo</div></td>
                                <td>
                                    <div class="glory-champion">
                                        <span class="glory-avatar is-gold">
                                            <img class="glory-avatar-image" src="/images/characters/monsters/boss/dimensional_devourer/avatars/dimensional_devourer.png" alt="Champion icon" />
                                        </span>
                                        <span class="glory-name">Dimensional Devourer</span>
                                    </div>
                                </td>
                                <td class="glory-count">2,850</td>
                                <td class="is-right glory-best is-gold">412 V | 88 D</td>
                            </tr>
                            <tr class="glory-row">
                                <td>
                                    <div class="glory-rank-cell">
                                        <span class="material-symbols-outlined glory-rank-icon is-silver">workspace_premium</span>
                                        <span class="glory-rank">2</span>
                                    </div>
                                </td>
                                <td><div class="glory-warrior">demo</div></td>
                                <td>
                                    <div class="glory-champion">
                                        <span class="glory-avatar">
                                            <img class="glory-avatar-image" src="/images/characters/humans/classes/death_knight/avatars/deathknight_avatar.png" alt="Champion icon" />
                                        </span>
                                        <span class="glory-name">Deathknight</span>
                                    </div>
                                </td>
                                <td class="glory-count">2,710</td>
                                <td class="is-right glory-best">385 V | 112 D</td>
                            </tr>
                            <tr class="glory-row">
                                <td>
                                    <div class="glory-rank-cell">
                                        <span class="material-symbols-outlined glory-rank-icon is-bronze">workspace_premium</span>
                                        <span class="glory-rank is-bronze">3</span>
                                    </div>
                                </td>
                                <td><div class="glory-warrior">demo</div></td>
                                <td>
                                    <div class="glory-champion">
                                        <span class="glory-avatar">
                                            <img class="glory-avatar-image" src="/images/characters/monsters/boss/baron/avatars/baron_avatar.png" alt="Champion icon" />
                                        </span>
                                        <span class="glory-name">Baron</span>
                                    </div>
                                </td>
                                <td class="glory-count">2,640</td>
                                <td class="is-right glory-best">310 V | 95 D</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="glory-cta">
                    <p>Prêt à graver votre nom dans l'histoire ?</p>
                    <button class="glory-link" onclick={() => { setStorage('leaderboard') }}>
                        VOIR LE CLASSEMENT COMPLET
                        <span class="material-symbols-outlined">arrow_right_alt</span>
                    </button>
                </div>
            </section>
        </section>
    {/if}


    {#if gameState === "fight"}
        <Fight bind:gameState />
    {/if}

    {#if gameState === "character-selection"}
        <CharacterSelection bind:gameState />
    {/if}

    {#if gameState === "register"}
        <Register bind:gameState />
    {/if}

    {#if gameState === "login"}
        <Login bind:gameState />
    {/if}

    {#if gameState === "collection"}
        <Collection bind:gameState />
    {/if}

    {#if gameState === "bestiary"}
        <Bestiary bind:gameState />
    {/if}

    {#if gameState === "leaderboard"}
        <Leaderboard bind:gameState />
    {/if}

    {#if gameState === "marketplace"}
        <Marketplace bind:gameState />
    {/if}

    {#if gameState === "about"}
        <About bind:gameState />
    {/if}

    {#if gameState === "profile"}
        <Profil bind:gameState />
    {/if}

    {#if gameState === "messages"}
        <Messages bind:gameState />
    {/if}

    {#if gameState === "fight" || gameState === "login" || gameState === "register" || gameState === "home" || gameState === "bestiary" || gameState === "leaderboard" || gameState === "collection" || gameState === "marketplace" || gameState === "about" || gameState === "profile" || gameState === "messages"}
        <footer class="site-footer">
            <div class="footer-inner">
                <div class="footer-brand">
                    <span class="footer-logo">ARENA BATTLE</span>
                    <p>© 2026 Arena Battle Games. Tous droits réservés.</p>
                </div>
                <div class="footer-links">
                    <a href="#">Conditions</a>
                    <a href="#">Confidentialité</a>
                    <a href="#">Contact</a>
                </div>
                <div class="footer-actions">
                    <a class="footer-icon" href="#">
                        <img
                            alt="Discord"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEBKb_qu2xX3ue6ifknMTqIqZtaNzD1ysd_EbKfzTrGM7UowyKM2n4ETn8pjzMUn4Kg23h0Hw4Z7URgRJr7ZbCMa5X_SHirCGQcstcYVU40voKsWO3XGO042tkfgIYFVkD0X4XV4Afy4bqLSF9KjZ0bgBI_DpTmNoV2EeD6OklcN74GdH48BveYnayk-WcHlsdPelbCQ6EMPW-kXNnqlI42nQEH1MlugYL8pY1kOVtbvT_AxaL0TKgICZvEJroNmBvMt4UTjmJxv4"
                        />
                    </a>
                    <button
                        class="footer-code"
                        onclick={window.open('https://github.com/TonyLcfOclock/projet_personnel_2026_arena_battle', '_blank')}
                    >
                        <span class="material-symbols-outlined">terminal</span>
                    </button>
                </div>
            </div>
        </footer>
    {/if}
{:else}
    <section class="loading-screen">
        <div class="loading-card">
            <p>Chargement du compte...</p>
        </div>
    </section>
{/if}

<style>
    .site-header {
        display: flex;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        height: 5.5rem;
        width: 100%;
        background: var(--color-overlay-strong);
        color: var(--color-white);
        border-bottom: 1px solid var(--color-border-accent);
        box-shadow: 0 16px 34px var(--shadow-panel-color);
        padding: 0 var(--page-gutter);
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        backdrop-filter: blur(14px);
        overflow-x: clip;
    }

    .site-header::before {
        content: "";
        position: absolute;
        inset: auto 0 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--color-border-accent), transparent);
        pointer-events: none;
    }

    .brand {
        margin-left: 1.5rem;
        flex: 0 0 auto;
        min-width: 0;
    }

    .header-logo {
        font-family: "Pirata One", system-ui;
        font-size: 1.8rem;
        letter-spacing: 0.18em;
        color: var(--color-accent-strong);
        display: block;
        margin-bottom: 0.4rem;
        text-shadow: none;
    }

    .main-nav {
        flex: 1;
        display: flex;
        justify-content: center;
        min-width: 0;
    }

    .main-nav ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        margin: 0;
        padding: 0;
        min-width: 0;
    }

    .nav-link {
        font-family: "Pirata One", system-ui;
        border: 1px solid transparent;
        background: transparent;
        color: var(--text-body-soft);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: clamp(1.02rem, 1.25vw, 1.2rem);
        font-weight: var(--font-weight-regular);
        padding: 0.55rem 0.9rem;
        border-radius: var(--radius-pill);
        cursor: pointer;
        transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
    }

    .nav-link:hover {
        color: var(--color-accent-strong);
        border-color: var(--color-border-accent);
        background: color-mix(in srgb, var(--color-overlay-soft) 60%, transparent);
        text-shadow: none;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        min-width: 0;
        flex: 0 0 auto;
    }

    .header-auth {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 0;
    }

    .header-auth-button {
        border: 1px solid var(--color-border-base);
        background: var(--color-surface-base);
        color: var(--text-body);
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.95rem;
        padding: 0.55rem 1.1rem;
        border-radius: var(--radius-pill);
        cursor: pointer;
        transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    }

    .header-auth-button:hover {
        border-color: var(--color-border-accent);
        color: var(--color-accent-strong);
        background: color-mix(in srgb, var(--color-overlay-soft) 75%, transparent);
    }

    .header-auth-button-primary {
        border-color: var(--color-border-accent);
        background: linear-gradient(135deg, var(--blood-red-dark), var(--blood-red), var(--blood-red-dark));
        color: var(--text-primary);
        box-shadow: 0 12px 26px var(--shadow-panel-color);
    }

    .header-auth-button-primary:hover {
        border-color: var(--color-accent-strong);
        color: var(--color-white);
    }

    .icon-button {
        border: 1px solid var(--color-border-accent);
        background: var(--color-surface-base);
        color: var(--color-accent-strong);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        padding: 0.5rem 1.05rem;
        cursor: pointer;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.9rem;
        transition:
            background 0.18s ease,
            color 0.18s ease,
            border-color 0.18s ease;
    }

    .icon-button:hover {
        border-color: var(--color-accent-strong);
        background: var(--color-surface-soft);
        color: var(--text-primary);
    }

    .profile-trigger-label {
        line-height: 1;
    }

    .profile-trigger-caret {
        font-size: 1rem;
        line-height: 1;
    }

    .profile-menu {
        position: relative;
    }

    .profile-dropdown {
        position: absolute;
        top: calc(100% + 0.6rem);
        right: 0;
        min-width: 14rem;
        background: var(--color-surface-soft);
        border: 1px solid var(--color-border-accent);
        border-radius: var(--radius-2xs);
        padding: 0;
        box-shadow: 0 8px 32px var(--color-overlay-hard);
        backdrop-filter: blur(8px);
        z-index: 20;
        overflow: hidden;
    }

    .profile-name-wrap {
        padding: 0.75rem;
        border-bottom: 1px solid var(--ui-border);
        background: color-mix(in srgb, var(--color-overlay-soft) 75%, transparent);
    }

    .profile-section-label {
        margin: 0 0 0.2rem;
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.55rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    .profile-name {
        margin: 0;
        font-family: "Pirata One", system-ui;
        font-size: 1.15rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--color-accent-strong);
    }

    .profile-identity-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;
    }

    .profile-gold {
        display: inline-flex;
        align-items: center;
        gap: 0.2rem;
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.62rem;
        font-weight: var(--font-weight-bold);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-accent-strong);
        white-space: nowrap;
    }

    .profile-gold .material-symbols-outlined {
        font-size: 0.95rem;
    }

    .menu-item {
        width: 100%;
        border: none;
        border-bottom: 1px solid var(--color-white-soft);
        background: transparent;
        color: var(--text-body);
        text-align: left;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.95rem;
        padding: 0.65rem 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        cursor: pointer;
        transition:
            background 0.12s ease,
            color 0.12s ease;
    }

    .menu-item + .menu-item {
        margin-top: 0;
    }

    .menu-item:hover {
        background: var(--color-white-soft);
        color: var(--text-primary);
    }

    .menu-item-icon {
        font-size: 1rem;
        color: var(--color-text-muted);
    }

    .menu-item-text {
        line-height: 1;
    }

    .menu-item.danger {
        background: var(--color-overlay-medium);
        border-bottom: none;
    }

    .menu-item.danger .menu-item-icon {
        color: var(--color-danger-soft);
    }

    .menu-item.danger .menu-item-text {
        color: var(--text-muted);
    }

    .menu-item.danger:hover {
        background: var(--color-danger-faint);
    }

    .menu-item.danger:hover .menu-item-text {
        color: var(--text-danger);
    }

    .loading-screen {
        min-height: calc(100dvh - var(--menu-height));
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem var(--page-gutter);
    }

    .loading-card {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        border-radius: var(--radius-md);
        padding: 1.5rem 2rem;
        color: var(--color-accent-strong);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.85rem;
        box-shadow: 0 18px 32px var(--shadow-panel-color), inset 0 0 0 1px var(--color-white-soft);
    }

    .home {
        max-width: 92rem;
        margin: 0 auto;
        padding: clamp(3rem, 6vw, 5.5rem) var(--page-gutter) 5rem;
        display: flex;
        flex-direction: column;
        gap: clamp(2.5rem, 4vw, 3.5rem);
    }

    .home-landing {
        max-width: none;
        margin: 0;
        padding: 0 0 9rem;
        gap: clamp(3rem, 6vw, 4.5rem);
    }

    .hero {
        position: relative;
    }

    .hero-landing {
        padding: clamp(6rem, 12vw, 9rem) var(--page-gutter) clamp(4rem, 10vw, 7rem);
        min-height: 50rem;
        overflow: visible;
    }

    .hero-inner {
        max-width: 92rem;
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: clamp(2.5rem, 5vw, 4.5rem);
        align-items: center;
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        padding: clamp(2.5rem, 6vw, 4.5rem);
        box-shadow: 0 22px 44px var(--shadow-panel-color), inset 0 0 0 1px var(--color-white-soft);
        position: relative;
        overflow: hidden;
    }

    .hero-inner::before {
        content: none;
    }

    .hero::after {
        content: none;
    }

    .hero-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .hero-kicker-line {
        width: 2rem;
        height: 1px;
        background: var(--text-danger);
    }

    .hero-eyebrow {
        font-family: "Crimson Pro", serif;
        color: var(--text-danger);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 1rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: 0.75rem;
    }

    .hero h1 {
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
        font-size: 4.5rem;
        font-weight: var(--font-weight-regular);
        line-height: 1.1;
        margin: 0 0 1rem;
        color: var(--text-primary);
    }

    .hero span {
        color: var(--text-danger);
        font-style: italic;
    }

    .hero-subtitle {
        font-family: "Crimson Pro", serif;
        color: var(--color-text-muted);
        font-style: italic;
        border-left: 2px solid var(--color-border-base);
        padding-left: 1.25rem;
        margin-bottom: 2rem;
        font-size: 1.5rem;
        max-width: 32rem;
        line-height: 1.6;
    }

    .arena-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.35rem 3.4rem;

    font-family: "Pirata One", system-ui, serif; 
    font-size: clamp(1.3rem, 2.3vw, 1.8rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;

    color: var(--text-primary);

    background:
        linear-gradient(135deg, var(--blood-red-dark) 0%, var(--blood-red) 52%, var(--blood-red-dark) 100%),
        url("https://www.transparenttextures.com/patterns/dark-leather.png");
    border: 2px solid var(--color-border-accent);
    border-radius: var(--radius-xs);

    cursor: pointer;
    user-select: none;

    box-shadow:
        0 0 20px var(--color-danger-soft),
        inset 0 0 18px var(--color-overlay-medium);

    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    
    text-decoration: none;
    }

    .arena-button:hover{
    transform: translateY(-2px);
    border-color: var(--color-accent-strong);
    box-shadow:
        0 0 30px var(--color-danger-soft),
        inset 0 0 20px var(--color-border-accent);
    }

    .arena-button-label{
    color: var(--text-primary) !important;
    line-height: 1;
    }

    .arena-button-icon{
    color: var(--color-accent-strong) !important;
    display: inline-block;
    transition: transform 0.2s ease;

    
    font-family: "Material Symbols Outlined";
    font-variation-settings: "wght" 400, "FILL" 0, "GRAD" 0, "opsz" 24;
    }

    .arena-button:hover .arena-button-icon-left{
    transform: rotate(12deg);
    }
    .arena-button:hover .arena-button-icon-right{
    transform: rotate(-12deg);
    }

    .arena-button-ember{
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, color-mix(in srgb, var(--color-danger-faint) 85%, transparent) 1px, transparent 1px);
    background-size: 10px 10px;
    opacity: 0.45;
    pointer-events: none;
    border-radius: var(--radius-xs);
    }

    .arena-button-corner{
    position: absolute;
    width: 24px;
    height: 24px;
    pointer-events: none;
    }

    .arena-button-corner-tl{
    top: -2px; left: -2px;
    border-top: 3px solid var(--color-accent-strong);
    border-left: 3px solid var(--color-accent-strong);
    border-radius: var(--radius-xs) 0 0 0;
    }
    .arena-button-corner-tr{
    top: -2px; right: -2px;
    border-top: 3px solid var(--color-accent-strong);
    border-right: 3px solid var(--color-accent-strong);
    border-radius: 0 4px 0 0;
    }
    .arena-button-corner-bl{
    bottom: -2px; left: -2px;
    border-bottom: 3px solid var(--color-accent-strong);
    border-left: 3px solid var(--color-accent-strong);
    border-radius: 0 0 0 4px;
    }
    .arena-button-corner-br{
    bottom: -2px; right: -2px;
    border-bottom: 3px solid var(--color-accent-strong);
    border-right: 3px solid var(--color-accent-strong);
    border-radius: 0 0 4px 0;
    }

    .hero-visual {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hero-visual img {
        max-width: min(100%, 40rem);
        width: 100%;
        height: 22rem;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-white-soft);
        filter: drop-shadow(0 10px 24px var(--shadow-panel-color));
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .feature-grid-landing {
        max-width: 92rem;
        margin: 0 auto;
        padding: 0 var(--page-gutter);
    }

    .feature-card {
        background: var(--color-surface-base);
        border: 1px solid var(--color-white-soft);
        padding: 1.4rem 1.5rem;
        box-shadow: 0 12px 28px var(--color-overlay-soft);
        position: relative;
        overflow: hidden;
    }

    .feature-card-landing {
        background: var(--color-surface-base);
        border: 1px solid var(--ui-border);
        padding: 2.5rem;
        transition: border-color 0.5s ease;
    }

    .feature-card-landing:hover {
        border-color: var(--text-danger);
    }

    .feature-card-landing::before {
        content: none;
        display: none;
    }

    .feature-card-topline {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(
            to right,
            transparent,
            var(--color-border-muted),
            transparent
        );
    }

    .feature-card-icon {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .feature-card-icon .material-symbols-outlined {
        font-size: 3.1rem;
        color: var(--text-danger);
    }

    .feature-card-divider {
        height: 1px;
        flex: 1;
        background: var(--color-border-muted);
    }

    .feature-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 3.2rem;
        height: 3px;
        background: var(--color-danger-faint);
    }

    .feature-card h2 {
        color: var(--text-primary);
        font-size: 1.1rem;
        margin: 0 0 0.6rem;
        letter-spacing: 0.02em;
    }

    .feature-card-landing h2 {
        font-family: "Pirata One", system-ui;
        font-size: 1.9rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 1rem;
    }

    .feature-card p {
        color: var(--text-body-soft);
        margin: 0;
        line-height: 1.6;
        font-size: 0.95rem;
    }

    .feature-card-landing p {
        font-family: "Crimson Pro", serif;
        font-size: 1.125rem;
        color: var(--color-white);
    }

    .glory {
        max-width: 100%;
        margin: 0;
        padding: 6rem var(--page-gutter) 0;
        position: relative;
    }

    .glory::before {
        content: none;
    }

    .glory > * {
        position: relative;
        z-index: 1;
    }

    .glory-header,
    .glory-table,
    .glory-cta {
        max-width: 92rem;
        margin: 0 auto;
    }

    .glory-cta p {
        padding-top: 2rem;
        padding-bottom: 1rem;
    }

    .glory-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 2.5rem;
    }

    .glory-title h2 {
        font-family: "Pirata One", system-ui;
        font-size: clamp(2.5rem, 4vw, 3.75rem);
        color: var(--text-primary);
        margin: 0 0 0.5rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .glory-title p {
        margin: 0;
        font-family: "Crimson Pro", serif;
        font-style: italic;
        color: var(--color-accent-soft);
    }

    .glory-tabs {
        display: flex;
        border-bottom: 1px solid var(--color-border-accent);
        box-shadow: inset 0 -1px 0 var(--color-white-soft);
    }

    .glory-tab {
        border: 1px solid transparent;
        background: var(--color-surface-soft);
        color: var(--stone-500);
        font-family: "Pirata One", system-ui;
        font-size: 1.5rem;
        padding: 0.85rem 1rem;
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        border-bottom: 2px solid transparent;
    }

    .glory-tab:hover {
        color: var(--accent-gold);
        border-color: var(--color-border-accent);
        border-bottom-color: var(--accent-gold);
        background: var(--color-surface-base);
    }

    .glory-tab.is-active {
        color: var(--accent-gold);
        border-color: var(--color-border-accent);
        border-bottom-color: var(--accent-gold);
        background: var(--color-surface-base);
    }

    .glory-table {
        border: 1px solid var(--ui-border-strong);
        background: var(--color-surface-base);
        overflow: hidden;
        box-shadow: inset 0 0 20px var(--color-overlay-medium), inset 0 0 0 1px var(--color-white-soft);
        backdrop-filter: blur(6px);
    }

    .glory-table-grid {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-family: "Spline Sans", sans-serif;
    }

    .glory-table-head {
        background: var(--color-overlay-medium);
        font-family: "Pirata One", "Georgia", serif;
        color: var(--accent-gold);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 1.125rem;
        font-weight: var(--font-weight-bold);
    }

    .glory-table th {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--ui-border-strong);
        text-align: left;
        vertical-align: middle;
    }

    .glory-table td {
        padding: 2rem 2rem;
        vertical-align: middle;
    }

    .glory-table-body {
        color: var(--text-body-soft);
    }

    .glory-row {
        transition: background 0.2s ease;
    }

    .glory-table-body .glory-row {
        border-bottom: 1px solid var(--ui-border-soft);
    }

    .glory-table-body .glory-row:last-child {
        border-bottom: none;
    }

    .glory-table-body .glory-row:hover {
        background: color-mix(in srgb, var(--color-overlay-soft) 70%, transparent);
    }

    .glory-table .is-right {
        text-align: right;
    }

    .glory-rank {
        font-family: "Pirata One", system-ui;
        font-size: 1.875rem;
        color: var(--color-text-muted);
    }

    .glory-rank-cell {
        display: flex;
        align-items: center;
        gap: 0.45rem;
    }

    .glory-rank-icon {
        font-size: 1.5rem;
        color: var(--text-muted);
    }

    .glory-rank-icon.is-gold {
        color: var(--accent-gold);
    }

    .glory-rank-icon.is-silver {
        color: var(--text-muted);
    }

    .glory-rank-icon.is-bronze {
        color: var(--color-text-muted);
    }

    .glory-rank.is-gold {
        color: var(--accent-gold);
    }

    .glory-rank.is-bronze {
        color: var(--color-text-muted);
    }

    .glory-champion {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .glory-warrior {
        font-family: "Pirata One", system-ui;
        font-size: 1.4rem;
        color: var(--text-primary);
        letter-spacing: 0.04em;
    }

    .glory-avatar {
        width: 3rem;
        height: 3rem;
        background: var(--ui-border-strong);
        border: 2px solid var(--color-border-muted);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-xs);
        color: var(--text-muted);
        flex: 0 0 auto;
    }

    .glory-avatar.is-gold {
        border-color: var(--color-border-accent);
        color: var(--accent-gold);
    }

    .glory-avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .glory-name {
        font-weight: var(--font-weight-bold);
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-text-body);
        line-height: 1.3;
    }

    .glory-count {
        font-family: "Pirata One", system-ui;
        font-size: 1.75rem;
        color: var(--color-danger);
        text-shadow: none;
    }

    .glory-best {
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.92rem;
        color: var(--color-text-body);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: var(--font-weight-bold);
    }

    .glory-best.is-gold {
        color: var(--accent-gold);
    }

    .glory-cta {
        margin-top: 2.5rem;
        text-align: center;
    }

    .glory-cta p {
        margin: 0 0 1rem;
        font-family: "Crimson Pro", serif;
        font-style: italic;
        color: var(--color-border-muted);
        font-size: 1.1rem;
    }

    .glory-link {
        border: none;
        background: transparent;
        color: var(--accent-gold);
        font-family: "Pirata One", system-ui;
        font-size: 1.6rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        transition: color 0.2s ease, transform 0.2s ease;
    }

    .glory-link:hover {
        color: var(--text-primary);
        transform: translateX(6px);
    }

    footer.site-footer {
        position: relative;
        background: var(--color-overlay-strong);
        border-top: 1px solid var(--color-border-accent);
        padding: 2rem var(--page-gutter);
        box-shadow: 0 -16px 32px var(--shadow-panel-color);
        color: var(--text-body);
        margin-top: auto;
    }

    .footer-inner {
        max-width: 92rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .footer-brand {
        text-align: left;
    }

    .footer-logo {
        font-family: "Pirata One", system-ui;
        font-size: 1.8rem;
        letter-spacing: 0.18em;
        color: var(--text-danger);
        display: block;
        margin-bottom: 0.4rem;
    }

    .footer-brand p {
        margin: 0;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--text-muted);
    }

    .footer-links {
        display: flex;
        gap: 2.5rem;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.3em;
        font-weight: var(--font-weight-semibold);
    }

    .footer-links a {
        color: var(--text-muted);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .footer-links a:hover {
        color: var(--text-danger);
    }

    .footer-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .footer-icon {
        width: 3rem;
        height: 3rem;
        border: 1px solid var(--ui-border);
        background: var(--color-surface-base);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-xs);
        transition: border-color 0.2s ease, background 0.2s ease;
    }

    .footer-icon img {
        width: 1.5rem;
        height: 1.5rem;
        opacity: 0.4;
        filter: invert(1);
        transition: opacity 0.2s ease;
    }

    .footer-icon:hover {
        border-color: var(--accent-gold);
        background: var(--color-border-base);
    }

    .footer-icon:hover img {
        opacity: 1;
    }

    .footer-code {
        border: 1px solid var(--ui-border);
        background: var(--color-surface-base);
        color: var(--text-body);
        padding: 0.65rem 1rem;
        border-radius: var(--radius-xs);
        font-family: "Pirata One", system-ui;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    }

    .footer-code:hover {
        border-color: var(--accent-gold);
        color: var(--accent-gold);
    }

    @media (max-width: 1250px) {
        .site-header {
            gap: 0.7rem;
        }

        .brand {
            margin-left: 0.8rem;
        }

        .header-logo {
            font-size: 1.5rem;
            letter-spacing: 0.14em;
        }

        .main-nav ul {
            gap: 0.45rem;
        }

        .nav-link {
            font-size: 1.02rem;
            padding: 0.45rem 0.68rem;
            letter-spacing: 0.1em;
        }

        .header-auth {
            gap: 0.45rem;
        }

        .header-auth-button {
            font-size: 0.82rem;
            padding: 0.45rem 0.75rem;
        }
    }

    @media (max-width: 900px) {
        .site-header {
            flex-wrap: wrap;
            height: auto;
            padding: 0.75rem var(--page-gutter);
        }

        .main-nav {
            order: 3;
            width: 100%;
            justify-content: flex-start;
        }

        .main-nav ul {
            flex-wrap: wrap;
        }

        .hero {
            grid-template-columns: 1fr;
        }

        .hero-visual img {
            max-width: 22rem;
        }

        .hero-landing {
            padding: 7rem var(--page-gutter) 4rem;
            min-height: auto;
        }

        .hero-inner {
            grid-template-columns: 1fr;
        }

        .glory-header {
            align-items: flex-start;
        }

        .footer-inner {
            flex-direction: column;
            align-items: flex-start;
        }

        .footer-links {
            flex-wrap: wrap;
            gap: 1.5rem;
        }
    }

    @media (max-width: 700px) {
        .glory-table {
            overflow-x: auto;
        }

        .glory-table-grid {
            min-width: 720px;
        }
    }
</style>
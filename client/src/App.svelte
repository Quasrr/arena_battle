<script>
    import { onDestroy, onMount } from "svelte";
    import Login from "./components/Login.svelte";
    import Register from "./components/Register.svelte";
    import Fight from "./components/Fight.svelte";
    import Game from "./assets/scripts/utils/Game.svelte.js";
    import CharacterSelection from "./components/CharacterSelection.svelte";
    import { initAuth, logoutUser } from "./assets/scripts/services/auth.service.js";
    import { authUser } from "./assets/scripts/store/auth.svelte.js";

    let gameState = $state(Game.state);
    let profileMenuOpen = $state(false);

    onMount(async () => {
        await initAuth();
        if (authUser.username) {
            if (authUser.currentBattle) {
                gameState = "fight";
            } else {
                gameState = "character-selection";
            }
        }
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

    onMount(() => {
        document.addEventListener("click", handleDocumentClick);
    });

    onDestroy(() => {
        document.removeEventListener("click", handleDocumentClick);
    });

    async function logout() {
        await logoutUser();

        window.location.reload();
    }
</script>

<header class="site-header">
    <div class="brand">
        <img src="/images/logo.png" alt="arena-battle-logo" />
    </div>
    <nav class="main-nav">
        <ul>
            <li><button class="nav-link">Jouer</button></li>
            <li><button class="nav-link">Bestiaire</button></li>
            <li><button class="nav-link">Classement</button></li>
        </ul>
    </nav>
    <div class="header-actions">
        <div class="profile-menu" onclick={(event) => event.stopPropagation()}>
            <button
                class="icon-button"
                title="Profil"
                
                onclick={toggleProfileMenu}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g><g id="SVGRepo_iconCarrier">
                        <path
                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                        <path
                            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>
                    </g>
                </svg>
            </button>
            {#if profileMenuOpen}
                <div class="profile-dropdown" role="menu">
                    {#if authUser.username}
                        <p class="profile-name">{authUser.username}</p>
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={closeProfileMenu}
                        >
                            Profil
                        </button>
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={closeProfileMenu}
                        >
                            Paramètres
                        </button>
                        <button
                            class="menu-item danger"
                            role="menuitem"
                            onclick={logout}
                        >
                            Déconnexion
                        </button>
                    {:else}
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={() => {
                                closeProfileMenu();
                                gameState = "login";
                            }}
                        >
                            Se connecter
                        </button>
                        <button
                            class="menu-item"
                            role="menuitem"
                            onclick={() => {
                                closeProfileMenu();
                                gameState = "register";
                            }}
                        >
                            S'enregistrer
                        </button>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</header>

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

<style>
    .site-header {
        display: flex;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        height: 5.5rem;
        width: 100%;
        background: linear-gradient(
            180deg,
            rgba(25, 20, 16, 0.98),
            rgba(16, 16, 12, 0.98)
        );
        color: white;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
        padding: 0 var(--page-gutter);
        box-sizing: border-box;
    }

    .brand img {
        margin-left: 3rem;
        height: 8rem;
        width: 8rem;
        filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35));
    }

    .main-nav {
        flex: 1;
        display: flex;
        justify-content: center;
    }

    .main-nav ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: clamp(0.75rem, 2vw, 1.5rem);
        margin: 0;
        padding: 0;
    }

    .nav-link {
        border: 1px solid transparent;
        background: transparent;
        color: #f1eae4;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.9rem;
        font-weight: 600;
        padding: 0.5rem 0.95rem;
        border-radius: 999px;
        cursor: pointer;
        transition:
            border-color 0.15s ease,
            background 0.15s ease,
            color 0.15s ease;
    }

    .nav-link:hover {
        background: rgba(226, 34, 76, 0.15);
        border-color: rgba(226, 34, 76, 0.35);
        color: #ffffff;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 0.6rem;
    }

    .icon-button {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.8rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: #1b1b12;
        color: #f4e9ec;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
        transition:
            transform 0.12s ease,
            border-color 0.12s ease,
            background 0.12s ease;
    }

    .icon-button:hover {
        transform: translateY(-1px);
        border-color: rgba(226, 34, 76, 0.45);
        background: rgba(226, 34, 76, 0.18);
    }

    .icon-button svg {
        width: 1.3rem;
        height: 1.3rem;
    }

    .profile-menu {
        position: relative;
    }

    .profile-dropdown {
        position: absolute;
        top: calc(100% + 0.6rem);
        right: 0;
        min-width: 12rem;
        background: #10100c;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0.75rem;
        padding: 0.65rem;
        box-shadow: 0 18px 36px rgba(0, 0, 0, 0.45);
        z-index: 20;
    }

    .profile-name {
        margin: 0 0 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        font-size: 0.85rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #e7e7e2;
    }

    .menu-item {
        width: 100%;
        border: 1px solid transparent;
        background: transparent;
        color: #f1eae4;
        text-align: left;
        font-size: 0.9rem;
        padding: 0.45rem 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition:
            background 0.12s ease,
            border-color 0.12s ease;
    }

    .menu-item:hover {
        background: rgba(226, 34, 76, 0.15);
        border-color: rgba(226, 34, 76, 0.35);
    }

    .menu-item.danger {
        color: #f5b2bf;
    }

    .main-nav ul {
        flex-wrap: wrap;
    }
</style>

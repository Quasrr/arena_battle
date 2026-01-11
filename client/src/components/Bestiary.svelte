<script>
    import { setAuth } from "../assets/scripts/store/auth.svelte.js";

    let { gameState = $bindable() } = $props();
</script>

<section class="bestiary">
    <div class="bestiary-hero">
        <div class="bestiary-text">
            <p class="bestiary-eyebrow">Bestiaire</p>
            <h1>Page en construction</h1>
            <p class="bestiary-subtitle">
                Le bestiaire arrive bientôt. Revenez pour découvrir tous les
                champions, leurs forces, et leurs faiblesses.
            </p>
        </div>
        <div class="bestiary-visual">
            <img src="/images/characters2.png" alt="Bestiaire en construction" />
        </div>
    </div>
</section>

<style>
    .bestiary {
        max-width: 92rem;
        margin: 0 auto;
        padding: clamp(3rem, 6vw, 5.5rem) var(--page-gutter) 5rem;
        display: flex;
        flex-direction: column;
        gap: clamp(2rem, 4vw, 3rem);
    }

    .bestiary-hero {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
        gap: clamp(2rem, 4vw, 3.75rem);
        align-items: center;
        background: linear-gradient(
            135deg,
            rgba(18, 16, 12, 0.95),
            rgba(34, 16, 18, 0.9)
        );
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 1.6rem;
        margin-top: 2rem;
        padding: clamp(2.25rem, 4.8vw, 3.6rem);
        box-shadow: 0 24px 50px rgba(0, 0, 0, 0.35);
        overflow: hidden;
        position: relative;
    }

    .bestiary-hero::after {
        content: "";
        position: absolute;
        inset: auto -20% 10% auto;
        width: 18rem;
        height: 18rem;
        background: radial-gradient(
            circle,
            rgba(226, 34, 76, 0.22),
            rgba(226, 34, 76, 0)
        );
        pointer-events: none;
    }

    .bestiary-eyebrow {
        color: rgba(241, 234, 228, 0.75);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .bestiary-text h1 {
        font-size: clamp(2rem, 3.6vw, 3.4rem);
        line-height: 1.1;
        margin: 0 0 1rem;
        color: #ffffff;
    }

    .bestiary-subtitle {
        color: rgba(241, 234, 228, 0.85);
        font-size: 1rem;
        max-width: 32rem;
        line-height: 1.6;
    }

    .bestiary-visual {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bestiary-visual img {
        max-width: min(100%, 34rem);
        width: 100%;
        border-radius: clamp(1rem, 2vw, 1.8rem);
        border: 1px solid rgba(255, 255, 255, 0.08);
        filter: drop-shadow(0 18px 38px rgba(0, 0, 0, 0.55));
    }

    @media (max-width: 900px) {
        .bestiary-hero {
            grid-template-columns: 1fr;
        }

        .bestiary-visual img {
            max-width: 22rem;
        }
    }
</style>
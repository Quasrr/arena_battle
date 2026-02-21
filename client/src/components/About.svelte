<script>
    let { gameState = $bindable() } = $props();
</script>

<main class="about-main">
    <section class="hero-banner">
        <div class="hero-banner-icons">
            <span class="material-symbols-outlined hero-bg-icon hero-bg-icon-left">code</span>
            <span class="material-symbols-outlined hero-bg-icon hero-bg-icon-right">sports_esports</span>
        </div>
        <div class="hero-banner-content">
            <h1>À propos du projet</h1>
            <div class="divider-ornament">
                <span class="material-symbols-outlined">terminal</span>
            </div>
            <p>
                "Ce projet est né d'une envie simple : créer quelque chose de concret, fonctionnel et personnel.
                Un terrain d'expérimentation pour progresser, tester des idées et transformer une passion pour le jeu vidéo et le développement en une réalisation tangible."
            </p>
        </div>
    </section>

    <div class="about-grid">
        <article class="unified-panel about-panel">
            <div class="panel-icon-wrap">
                <span class="material-symbols-outlined">visibility</span>
            </div>
            <h2>La Démarche</h2>
            <h3>Apprendre en construisant</h3>
            <div class="about-copy">
                <p>
                    Ce projet a été conçu comme un laboratoire personnel en JavaScript et TypeScript.
                    L'objectif n'était pas seulement de produire une interface ou un jeu fonctionnel,
                    mais de comprendre en profondeur les mécanismes, la structure du code
                    et les bonnes pratiques de développement.
                </p>
                <p>
                    Chaque fonctionnalité a été pensée comme un exercice : architecture,
                    logique métier, gestion d'état, modularité et lisibilité du code.
                    Il s'agit avant tout d'un projet d'apprentissage évolutif.
                </p>
            </div>
        </article>

        <article class="unified-panel about-panel">
            <div class="panel-icon-wrap">
                <span class="material-symbols-outlined">person</span>
            </div>
            <h2>Le Développeur</h2>
            <h3>Un projet personnel et passionné</h3>
            <div class="team-stack">
                <div class="team-card">
                    <div class="team-avatar">
                        <span class="material-symbols-outlined">code</span>
                    </div>
                    <div>
                        <h4>Développeur JavaScript / TypeScript</h4>
                        <p class="team-role">Conception & Développement</p>
                        <p class="team-desc">
                            Passionné par l'informatique et les jeux vidéo,
                            j'ai réalisé ce projet pour approfondir mes compétences,
                            structurer ma pratique et transformer des idées en produit concret.
                        </p>
                    </div>
                </div>
            </div>
        </article>
    </div>

    <section class="partners-section">
        <div class="partners-head">
            <h2>Technologies utilisées</h2>
            <div class="partners-underline"></div>
        </div>

        <div class="partners-grid">
            <div class="partner-item">
                <span class="material-symbols-outlined partner-logo">javascript</span>
                <span class="partner-name">JavaScript</span>
            </div>
            <div class="partner-item">
                <span class="material-symbols-outlined partner-logo">data_object</span>
                <span class="partner-name">TypeScript</span>
            </div>
            <div class="partner-item">
                <span class="material-symbols-outlined partner-logo">palette</span>
                <span class="partner-name">HTML / CSS</span>
            </div>
            <div class="partner-item">
                <span class="material-symbols-outlined partner-logo">build</span>
                <span class="partner-name">Architecture modulaire</span>
            </div>
        </div>
    </section>
</main>


<style>
    .about-main {
        --primary-blood: var(--text-danger);
        --blood-red: var(--color-danger);
        --accent-gold: var(--text-accent);
        --bone-white: var(--color-white);
        --obsidian: var(--color-surface-base);
        --charcoal: var(--color-surface-base);
        --dark-stone: var(--color-surface-base);

        color: var(--bone-white);
        padding-top: 5rem;
        position: relative;
        isolation: isolate;
    }

    .unified-panel {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        box-shadow: 0 10px 24px var(--color-overlay-medium), inset 0 0 0 1px var(--color-white-soft);
        color: var(--bone-white);
    }

    .hero-banner {
        position: relative;
        overflow: hidden;
        text-align: center;
        padding: 6rem 1.5rem;
        border-bottom: 1px solid var(--color-border-base);
        background: var(--color-surface-base);
    }

    .hero-banner-icons {
        position: absolute;
        inset: 0;
        opacity: 0.2;
        pointer-events: none;
    }

    .hero-bg-icon {
        position: absolute;
        color: var(--color-danger-faint);
        font-size: clamp(16rem, 32vw, 31rem);
    }

    .hero-bg-icon-left {
        top: -2.5rem;
        left: -2.5rem;
    }

    .hero-bg-icon-right {
        right: -2.5rem;
        bottom: -5rem;
    }

    .hero-banner-content {
        position: relative;
        z-index: 1;
        max-width: 56rem;
        margin: 0 auto;
    }

    .hero-banner h1 {
        margin: 0 0 1.5rem;
        font-family: "Pirata One", "Georgia", serif;
        font-size: clamp(4.4rem, 8vw, 4rem);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--primary-blood);
        filter: none;
    }

    .divider-ornament {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: var(--accent-gold);
        margin: 0 auto 2rem;
        max-width: 18rem;
    }

    .divider-ornament::before,
    .divider-ornament::after {
        content: "";
        height: 1px;
        flex-grow: 1;
        background: linear-gradient(90deg, transparent, var(--primary-blood), transparent);
    }

    .hero-banner p {
        margin: 0 auto;
        max-width: 48rem;
        color: var(--color-text-body);
        font-size: clamp(1.15rem, 2.8vw, 1.2rem);
        font-weight: var(--font-weight-light);
        line-height: 1.625;
        font-style: italic;
    }

    .about-grid {
        max-width: 80rem;
        margin: 0 auto;
        padding: 4rem 1.5rem;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 3rem;
    }

    .about-panel {
        position: relative;
        overflow: hidden;
        padding: 2.5rem;
    }

    .panel-icon-wrap {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1rem;
        opacity: 0.05;
    }

    .panel-icon-wrap .material-symbols-outlined {
        font-size: 5.5rem;
    }

    .about-panel h2 {
        margin: 0 0 0.5rem;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 2.25rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--primary-blood);
    }

    .about-panel h3 {
        margin: 0 0 1.5rem;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.25rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-style: italic;
        color: var(--accent-gold);
    }

    .about-copy {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        line-height: 1.625;
    }

    .about-copy p {
        margin: 0;
    }

    .team-stack {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .team-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        background: var(--color-surface-base);
        border-left: 2px solid var(--color-border-accent);
        box-shadow: inset 0 0 0 1px var(--color-white-soft);
    }

    .team-avatar {
        width: 3rem;
        height: 3rem;
        background: var(--charcoal);
        border: 1px solid var(--color-text-subtle);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
    }

    .team-avatar .material-symbols-outlined {
        color: var(--primary-blood);
    }

    .team-card h4 {
        margin: 0;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.125rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .team-role {
        margin: 0.2rem 0 0.25rem;
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.625rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--accent-gold);
    }

    .team-desc {
        margin: 0;
        font-size: 0.875rem;
        color: var(--color-text-muted);
        line-height: 1.4;
    }

    .partners-section {
        max-width: 80rem;
        margin: 0 auto 3rem;
        padding: 3rem 1.5rem;
    }

    .partners-head {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .partners-head h2 {
        margin: 0;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.875rem;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--primary-blood);
    }

    .partners-underline {
        margin: 0.5rem auto 0;
        width: 8rem;
        height: 1px;
        background: var(--primary-blood);
        opacity: 0.5;
    }

    .partners-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2rem;
        align-items: center;
        justify-items: center;
        opacity: 0.6;
    }

    .partner-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .partner-logo {
        font-size: 3.75rem;
        filter: grayscale(1) brightness(0.7) contrast(1.2);
        transition: filter 0.3s ease;
    }

    .partner-name {
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.625rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--color-text-muted);
        font-weight: var(--font-weight-semibold);
        transition: color 0.2s ease;
        text-align: center;
    }

    .partner-item:hover .partner-logo {
        filter: grayscale(0) brightness(1) contrast(1);
    }

    .partner-item:hover .partner-name {
        color: var(--accent-gold);
    }

    @media (min-width: 1024px) {
        .about-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 768px) {
        .partners-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }
</style>
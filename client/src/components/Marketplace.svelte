<script>
    import swordIcon from "../assets/image/sword.png";

    let { gameState = $bindable() } = $props();
</script>

<section class="marketplace-page">
    <div class="marketplace-layout">
        <aside class="marketplace-sidebar">
            <div class="unified-panel riches-panel">
                <h2 class="panel-title">Trésorerie</h2>
                <div class="panel-stack">
                    <div>
                        <label class="panel-label">Trésor Personnel</label>
                        <div class="panel-row riches-value">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">14,250</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="unified-panel purchases-panel">
                <h3 class="panel-subtitle">Derniers Achats</h3>
                <div class="purchase-list">
                    <div class="purchase-item">
                        <div class="purchase-icon">
                            <img class="purchase-icon-image" src={swordIcon} alt="Article achete" />
                        </div>
                        <div class="purchase-info">
                            <div class="purchase-name">Fiole de Bile</div>
                            <div class="purchase-price">
                                <span class="material-symbols-outlined">monetization_on</span>
                                -250 Or
                            </div>
                        </div>
                        <span class="purchase-time">Il y a 1h</span>
                    </div>
                    <div class="purchase-item">
                        <div class="purchase-icon">
                            <img class="purchase-icon-image" src={swordIcon} alt="Article achete" />
                        </div>
                        <div class="purchase-info">
                            <div class="purchase-name">Dague Rouillée</div>
                            <div class="purchase-price">
                                <span class="material-symbols-outlined">monetization_on</span>
                                -1,200 Or
                            </div>
                        </div>
                        <span class="purchase-time">Hier</span>
                    </div>
                </div>
            </div>
        </aside>

        <section class="marketplace-main">
            <header class="marketplace-header">
                <h1>Le Marché Noir</h1>
                <p>Tout a un prix, même votre âme</p>
                <div class="marketplace-divider"></div>
            </header>

            <div class="marketplace-tabs">
                <button class="marketplace-tab tab-active">Équipement</button>
                <button class="marketplace-tab">Consommables</button>
            </div>

            <div class="item-grid">
                <article class="item-card rarity-gold">
                    <div class="item-header">
                        <div class="item-icon">
                            <img class="item-icon-image" src={swordIcon} alt="Article du marche" />
                        </div>
                        <span class="item-rarity is-gold">Légendaire</span>
                    </div>
                    <h3>Égide des Damnos</h3>
                    <p>"Les cris des anciens porteurs résonnent encore contre l'acier noirci."</p>
                    <div class="item-footer">
                        <div class="item-price">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">6,500</span>
                        </div>
                        <button class="item-action is-gold">Acheter</button>
                    </div>
                </article>

                <article class="item-card rarity-red">
                    <div class="item-header">
                        <div class="item-icon">
                            <img class="item-icon-image" src={swordIcon} alt="Article du marche" />
                        </div>
                        <span class="item-rarity is-red">Rare</span>
                    </div>
                    <h3>Tranchoir de Boucher</h3>
                    <p>"L'acier n'est jamais vraiment propre, peu importe le nombre de lavages."</p>
                    <div class="item-footer">
                        <div class="item-price">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">4,200</span>
                        </div>
                        <button class="item-action is-gold">Acheter</button>
                    </div>
                </article>

                <article class="item-card rarity-silver">
                    <div class="item-header">
                        <div class="item-icon">
                            <img class="item-icon-image" src={swordIcon} alt="Article du marche" />
                        </div>
                        <span class="item-rarity is-silver">Commun</span>
                    </div>
                    <h3>Plastron de Milice</h3>
                    <p>"Protection standard pour ceux dont la vie ne vaut pas grand-chose."</p>
                    <div class="item-footer">
                        <div class="item-price">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">850</span>
                        </div>
                        <button class="item-action is-muted">Acheter</button>
                    </div>
                </article>

                <article class="item-card rarity-red">
                    <div class="item-header">
                        <div class="item-icon">
                            <img class="item-icon-image" src={swordIcon} alt="Article du marche" />
                        </div>
                        <span class="item-rarity is-red">Rare</span>
                    </div>
                    <h3>Heaume de l'Effroi</h3>
                    <p>"Portez le visage de la mort pour mieux l'apprivoiser."</p>
                    <div class="item-footer">
                        <div class="item-price">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">3,100</span>
                        </div>
                        <button class="item-action is-gold">Acheter</button>
                    </div>
                </article>

                <article class="item-card rarity-gold">
                    <div class="item-header">
                        <div class="item-icon">
                            <img class="item-icon-image" src={swordIcon} alt="Article du marche" />
                        </div>
                        <span class="item-rarity is-gold">Légendaire</span>
                    </div>
                    <h3>Sceptre Sanglant</h3>
                    <p>"Canalise l'énergie des défunts pour ravager les vivants."</p>
                    <div class="item-footer">
                        <div class="item-price">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">8,900</span>
                        </div>
                        <button class="item-action is-gold">Acheter</button>
                    </div>
                </article>

                <article class="item-card rarity-silver">
                    <div class="item-header">
                        <div class="item-icon">
                            <img class="item-icon-image" src={swordIcon} alt="Article du marche" />
                        </div>
                        <span class="item-rarity is-silver">Commun</span>
                    </div>
                    <h3>Gantelets de Fer</h3>
                    <p>"Lourds, froids, mais redoutablement efficaces."</p>
                    <div class="item-footer">
                        <div class="item-price">
                            <span class="material-symbols-outlined">monetization_on</span>
                            <span class="stat-value">650</span>
                        </div>
                        <button class="item-action is-muted">Acheter</button>
                    </div>
                </article>
            </div>

            <div class="marketplace-footer">
                <button class="marketplace-more">Attendre le prochain arrivage (2h 45m)</button>
            </div>
        </section>
    </div>
</section>

<style>
    :global(.material-symbols-outlined) {
        font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
    }

    .marketplace-page {
        --primary-blood: var(--text-danger);
        --primary-blood-strong: var(--color-danger);
        --gold: var(--text-accent);
        --charcoal: var(--color-surface-base);
        --dark-stone: var(--color-surface-base);
        --bone: var(--color-white);
        --divider-gold: var(--color-surface-base);
        max-width: 1600px;
        margin: 0 auto;
        padding: 6.2rem var(--page-gutter) 4rem;
        color: var(--bone);
        font-family: "Crimson Pro", "Times New Roman", serif;
        position: relative;
        isolation: isolate;
    }

    .marketplace-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 2rem;
    }

    .marketplace-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .marketplace-main {
        display: flex;
        flex-direction: column;
        gap: 1.35rem;
    }

    @media (min-width: 1024px) {
        .marketplace-layout {
            grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
        }
    }

    .unified-panel {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        color: var(--bone);
        padding: 2rem;
        box-shadow: 0 14px 30px var(--shadow-panel-color), inset 0 0 0 1px var(--color-white-soft);
    }

    .riches-panel {
        padding: 2rem;
    }

    .panel-title {
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.75rem;
        font-weight: var(--font-weight-regular);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 1.5rem;
        border-bottom: 1px solid var(--color-surface-soft);
        padding-bottom: 0.75rem;
        color: var(--text-primary);
    }

    .panel-subtitle {
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        color: var(--text-muted);
        margin: 0 0 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--color-surface-soft);
    }

    .panel-stack {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .panel-label {
        font-family: "Inter", "Segoe UI", sans-serif;
        font-size: 0.55rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        font-weight: var(--font-weight-bold);
    }

    .panel-row {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-top: 0.5rem;
    }

    .panel-row span:first-child {
        color: var(--gold);
    }

    .stat-value {
        font-family: "Pirata One", "Georgia", serif;
        font-size: 2.5rem;
        color: var(--gold);
        line-height: 1;
    }
    .purchase-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .purchase-item {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        border-bottom: 1px solid var(--ui-border-soft);
        padding-bottom: 0.75rem;
    }

    .purchase-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .purchase-icon {
        width: 2.5rem;
        height: 2.5rem;
        background: var(--color-overlay-medium);
        border: 1px solid var(--color-border-base);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
    }

    .purchase-icon span {
        filter: grayscale(1) contrast(1.4) brightness(0.7);
        font-size: 1.1rem;
    }

    .purchase-icon-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: none;
    }

    .purchase-info {
        flex: 1;
    }

    .purchase-name {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--text-primary);
        font-weight: var(--font-weight-bold);
    }

    .purchase-price {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--gold);
        font-weight: var(--font-weight-bold);
    }

    .purchase-price span {
        font-size: 0.8rem;
    }

    .purchase-time {
        font-size: 0.6rem;
        color: var(--color-text-muted);
        font-style: italic;
    }

    .marketplace-header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .marketplace-header h1 {
        font-family: "Pirata One", "Georgia", serif;
        font-size: clamp(2.8rem, 6vw, 3.75rem);
        font-weight: var(--font-weight-regular);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        margin: 0 0 0.5rem;
        color: var(--bone);
        text-shadow: 0 8px 24px var(--color-overlay-medium);
    }

    .marketplace-header p {
        font-family: "Pirata One", "Georgia", serif;
        font-size: clamp(1.2rem, 3vw, 1.7rem);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        color: var(--gold);
        opacity: 0.8;
        margin: 0;
    }

    .marketplace-divider {
        height: 1px;
        width: 16rem;
        margin: 1.5rem auto 0;
        background: var(--ui-border-strong);
    }

    .marketplace-tabs {
        display: flex;
        border-bottom: 1px solid var(--color-border-accent);
        font-family: "Pirata One", "Georgia", serif;
        text-transform: uppercase;
        letter-spacing: 0.16em;
    }

    .marketplace-tab {
        background: var(--color-surface-soft);
        border: 1px solid transparent;
        color: var(--text-muted);
        padding: 1rem 2rem;
        font-family: inherit;
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        border-bottom: 2px solid transparent;
    }

    .marketplace-tabs button {
        font-size: 1.5rem;
    }

    .marketplace-tab:hover {
        color: var(--gold);
        border-color: var(--color-border-accent);
        border-bottom-color: var(--gold);
        background: var(--color-surface-base);
    }

    .marketplace-tab.tab-active {
        color: var(--gold);
        border-color: var(--color-border-accent);
        background: var(--color-surface-base);
    }

    .item-grid {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1.5rem;
    }

    @media (min-width: 768px) {
        .item-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 1280px) {
        .item-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    .item-card {
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-base);
        padding: 1.5rem;
        transition: all 0.3s ease;
        position: relative;
    }

    .item-card:hover {
        border-color: var(--primary-blood-strong);
        background: var(--color-surface-soft);
    }

    .rarity-gold {
        border-top: 3px solid var(--gold);
    }

    .rarity-red {
        border-top: 3px solid var(--primary-blood-strong);
    }

    .rarity-silver {
        border-top: 3px solid var(--color-text-muted);
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .item-icon {
        width: 5rem;
        height: 5rem;
        background: var(--color-overlay-medium);
        border: 1px solid var(--color-text-subtle);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .item-icon span {
        font-size: 2.5rem;
        color: var(--text-muted);
        filter: grayscale(1) contrast(1.5) brightness(0.6) sepia(0.2);
    }

    .item-icon-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: none;
    }

    .item-rarity {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-weight: var(--font-weight-bold);
    }

    .item-rarity.is-gold {
        color: var(--gold);
    }

    .item-rarity.is-red {
        color: var(--primary-blood);
    }

    .item-rarity.is-silver {
        color: var(--text-muted);
    }

    .item-card h3 {
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--bone);
        margin: 0 0 0.5rem;
    }

    .item-card p {
        font-size: 0.75rem;
        color: var(--text-muted);
        font-style: italic;
        margin: 0 0 1.5rem;
    }

    .item-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid var(--ui-border-soft);
        padding-top: 1rem;
    }

    .item-price {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        color: var(--gold);
    }

    .item-price span:first-child {
        font-size: 1.1rem;
    }

    .item-action {
        background: transparent;
        border: 1px solid var(--gold);
        color: var(--gold);
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-weight: var(--font-weight-bold);
        padding: 0.35rem 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .item-action:hover {
        background: var(--gold);
        color: var(--color-black);
    }

    .item-action.is-muted {
        border-color: var(--text-muted);
        color: var(--text-muted);
    }

    .item-action.is-muted:hover {
        border-color: var(--gold);
        color: var(--gold);
        background: transparent;
    }

    .marketplace-footer {
        background: var(--color-overlay-soft);
        padding: 1.5rem;
        border: 1px solid var(--color-border-accent);
        text-align: center;
    }

    .marketplace-more {
        background: transparent;
        border: none;
        font-family: "Pirata One", "Georgia", serif;
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--text-muted);
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .marketplace-more:hover {
        color: var(--gold);
    }

    @media (max-width: 900px) {
        .marketplace-page {
            padding-top: 6.1rem;
        }

        .marketplace-tabs {
            flex-direction: column;
            align-items: flex-start;
        }

        .marketplace-tab {
            width: 100%;
            text-align: left;
        }
    }
</style>
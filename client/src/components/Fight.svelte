<script>
    import Fight from "../assets/scripts/utils/Fight.svelte.js";
    import Utilities from "../assets/scripts/utils/Utilities.svelte.js";
    import { authUser } from "../assets/scripts/store/auth.svelte.js";
    import { onMount } from "svelte";
    import pieIcon from "../assets/image/pie.png";
    import swordIcon from "../assets/image/sword.png";

    let { gameState = $bindable() } = $props();

    // initialisation du combat et des logs du combat en undefined avant récupération des informations
    let fight = $state(undefined);
    let logs = $state(undefined);

    // initialisation des personnages en undefined avant récupération des informations
    let player = $state(undefined);
    let enemy = $state(undefined);

    // état des personnages
    let playerIsDead = $state(false);
    let enemyIsDead = $state(false);

    // initialisation de l'action du joueur en undefined
    let action = $state(undefined);

    // initialisation des tours du combat
    let turn = $state(0);

    // initialisation du personnage qui joue un tour
    let playTurn = $state(undefined);

    // initialisation de la liste des sorts du personnage à afficher dans la vue
    let playerSpellsList = $state([]);

    // initialisation des propriétés passives des personnages
    let playerPassivesList = $state([]);
    let enemyPassivesList = $state([]);

    // initialisation des propriétés passives des personnages
    let playerBuffsList = $state([]);
    let enemyBuffsList = $state([]);

    const playerParameters = $state({
        logReverse: false
    })

    const inventoryObjects = [
        { name: "Lame de guerre", quantity: 1, icon: swordIcon, description: "Épée lourde forgée pour les duels rapprochés." },
        { name: "Bouclier runique", quantity: 1, icon: swordIcon, description: "Bouclier grave de runes qui amortit les impacts." }
    ];

    const inventoryConsumables = [
        { name: "Potion de soin", quantity: 3, icon: pieIcon, description: "Restaure des points de vie quand elle est utilisée." },
        { name: "Élixir de vitesse", quantity: 2, icon: pieIcon, description: "Augmente la vitesse pour prendre l'avantage du tour." },
        { name: "Baume de défense", quantity: 1, icon: pieIcon, description: "Renforce l'armure pendant une courte durée." }
    ];

    let playerIsHit = $state(false);
    let enemyIsHit = $state(false);

    let playerDamagePopup = $state(undefined);
    let enemyDamagePopup = $state(undefined);

    let playerHitToken = 0;
    let enemyHitToken = 0;
    let playerPopupToken = 0;
    let enemyPopupToken = 0;

    function triggerDamageFeedback(side, damage) {
        if (!Number.isFinite(damage) || damage <= 0) {
            return;
        }

        if (side === "player") {
            const hitToken = ++playerHitToken;
            const popupToken = ++playerPopupToken;

            playerIsHit = true;
            playerDamagePopup = { id: popupToken, value: damage };

            setTimeout(() => {
                if (playerHitToken === hitToken) {
                    playerIsHit = false;
                }
            }, 280);

            setTimeout(() => {
                if (playerPopupToken === popupToken) {
                    playerDamagePopup = undefined;
                }
            }, 900);

            return;
        }

        const hitToken = ++enemyHitToken;
        const popupToken = ++enemyPopupToken;

        enemyIsHit = true;
        enemyDamagePopup = { id: popupToken, value: damage };

        setTimeout(() => {
            if (enemyHitToken === hitToken) {
                enemyIsHit = false;
            }
        }, 280);

        setTimeout(() => {
            if (enemyPopupToken === popupToken) {
                enemyDamagePopup = undefined;
            }
        }, 900);
    }

    function updateCharacterState(side, nextCharacter, withFeedback = true) {
        if (!nextCharacter) {
            return;
        }

        const current = side === "player" ? player : enemy;

        if (withFeedback && current?.statistics && nextCharacter?.statistics) {
            const previousHp = Number(current.statistics.hp ?? 0);
            const nextHp = Number(nextCharacter.statistics.hp ?? 0);
            const damageTaken = Math.max(0, Math.round(previousHp - nextHp));

            if (damageTaken > 0) {
                triggerDamageFeedback(side, damageTaken);
            }
        }

        if (side === "player") {
            player = nextCharacter;
        } else {
            enemy = nextCharacter;
        }
    }

    // exécuté au montage du composant
    onMount(async () => {
        // le serveur envoie les informations nécessaires au début du combat
        const battle = await startBattle();

        // affectation des personnages
        updateCharacterState("player", battle.player, false);
        updateCharacterState("enemy", battle.enemy, false);
        turn = battle.turn;

        // attribution des logs
        fight = new Fight();
        logs = fight.fightingLogs;

        // log de démarrage du combat
        fight.addLogsLine(battle.log);

        // démarrage du combat
        fighting();
    });

    function switchText() {
        playerParameters.logReverse = !playerParameters.logReverse;
    }

    async function startBattle() {
        // demande au serveur les informations du combat
        const res = await fetch(`/api/battle/${authUser.currentBattle}`);

        const battle = await res.json();

        return battle;
    }

    async function determineAction(data, act, name) {
        const res = await fetch(`/api/battle/${data.currentBattle}/determine-player-action?action=${act}&name=${name}`);

        const spell = await res.json();

        action = spell.action;
    }

    async function fighting() {
        while (!playerIsDead && !enemyIsDead) {
            

            let toPlay = await fight.getCharacterHitTurn(authUser);

            updateCharacterState("player", await fight.reduceCharactersSpellsCooldown(authUser, player.name));
            updateCharacterState("enemy", await fight.reduceCharactersSpellsCooldown(authUser, enemy.name));

            // affichage des sorts du joueur dans la vue
            playerSpellsList = Utilities.initiatePlayerSpells(player);

            // affichage des propriétés passives des personnages
            playerPassivesList = Utilities.initiatePassives(player);
            enemyPassivesList = Utilities.initiatePassives(enemy);

            // affichage des buffs des personnages
            playerBuffsList = Utilities.initiateBuffs(player);
            enemyBuffsList = Utilities.initiateBuffs(enemy);

            fight.addLogsLine({
                text: `Début du tour ${turn} !`,
                styles: [
                    { word: `tour`, color: "var(--color-text-muted)" },
                    { word: `${turn}`, color: "var(--color-text-muted)" },
                ],
            });

            await Utilities.sleep(1000);

            if (toPlay) {
                // tour du joueur

                playTurn = player.name;

                updateCharacterState("player", await fight.refreshCharacterDebuff(authUser, player.name));
                updateCharacterState("player", await fight.refreshCharacterBuff(authUser, player.name));

                updateCharacterState("player", await fight.passivePerTurn(authUser, enemy.name, player.name));

                let negateLog = [];

                // affectations par destructuration de la réponse
                const playerNegativeEffects = await fight.checkCharacterNegativeEffectStates(authUser, player.name);
                updateCharacterState("player", playerNegativeEffects.character);
                negateLog = playerNegativeEffects.log;

                negateLog.forEach((element) => fight.addLogsLine(element));

                if (fight.canPlayTurn(player)) {

                    // attente de choix d'une action
                    while (!action) {
                        await Utilities.sleep(50);
                    }

                    let spellLog;

                    const playerActionResult = await fight.actionToDo(authUser, action, enemy.name, player.name, turn);
                    updateCharacterState("enemy", playerActionResult.target);
                    updateCharacterState("player", playerActionResult.self);
                    spellLog = playerActionResult.log;

                    spellLog.forEach((element) => fight.addLogsLine(element));
                }

                await Utilities.sleep(2000);
            } else {
                playTurn = enemy.name;

                updateCharacterState("enemy", await fight.refreshCharacterDebuff(authUser, enemy.name));
                updateCharacterState("enemy", await fight.refreshCharacterBuff(authUser, enemy.name));

                updateCharacterState("enemy", await fight.passivePerTurn(authUser, player.name, enemy.name));

                let negateLog = [];

                const enemyNegativeEffects = await fight.checkCharacterNegativeEffectStates(authUser, enemy.name);
                updateCharacterState("enemy", enemyNegativeEffects.character);
                negateLog = enemyNegativeEffects.log;

                negateLog.forEach((element) => fight.addLogsLine(element));

                if (fight.canPlayTurn(enemy)) {

                    let act;

                    ({ action: act } = await fight.randomAction(authUser, enemy.name));

                    let spellLog;

                    const enemyActionResult = await fight.actionToDo(authUser, act, player.name, enemy.name, turn);
                    updateCharacterState("player", enemyActionResult.target);
                    updateCharacterState("enemy", enemyActionResult.self);
                    spellLog = enemyActionResult.log;

                    spellLog.forEach((element) => fight.addLogsLine(element));
                }

                await Utilities.sleep(2000);
            }

            turn++;
            action = undefined;
            playTurn = undefined;

            if (player.statistics.hp <= 0) {
                playerIsDead = await fight.checkCharacterAlive(authUser, player.name);
            } else if (enemy.statistics.hp <= 0) {
                enemyIsDead = await fight.checkCharacterAlive(authUser, enemy.name);
            }

            if (playerIsDead || enemyIsDead) {
                await Utilities.sleep(15000);
                window.location.reload();
            }
        }
    }
</script>

{#if player}
    <main>
        <section class="characters-hp-stats">
            <div class="player" class:is-active={playTurn === player.name}>
                <div class="player-name-class">
                    <p>{ player.name }</p>
                    <p>Class</p>
                </div>

                <div class="player-bars">
                    <div class="health">
                        <div class="health-text">
                            <p class="hp">HP</p>
                            <p>{`${player.statistics.hp <= 0 ? 0 : player.statistics.hp} / ${player.baseStatistics.hp}`}</p>
                        </div>

                        <div class="healthbar">
                            <div style={`width: ${player.statistics.hp <= 0 ? 0 : (player.statistics.hp * 100) / player.baseStatistics.hp}%`} class="health-fill"></div>
                        </div>
                    </div>
                </div>

                <div class="statistics">
                    <p><span>STR</span> {`${player.statistics.str}`}</p>
                    <p><span>ARM</span> {`${player.statistics.arm}`}</p>
                    <p><span>SPEED</span> {`${player.statistics.speed}`}</p>
                    <p><span>CRIT %</span> {`${Math.round(player.statistics.critChance.toFixed(1) * 100)}`}</p>
                    <p><span>CRIT DMG%</span> {`${Math.round(player.statistics.critDamage.toFixed(1) * 100)}`}</p>
                </div>
                <div class="passives">
                    {#each playerPassivesList as passive}
                        {#if passive.display}
                        <div class="passive">
                            <div class="passive-info">{passive.description}</div>
                            <p>{passive.stacks > 0 ? `${passive.name}: ${passive.stacks}` : `${passive.name}`}</p>
                        </div>
                        {/if}
                    {/each}
                </div>
                <div class="buffs-debuffs">
                    {#each playerBuffsList as buff}
                        {#if buff.state}
                            <p class="buff">{buff.name}</p>
                        {/if}
                    {/each}
                    <!-- <p class="debuff">Debuff</p> -->
                </div>
            </div>

            <div class="playing-turn" class:is-active={playTurn === player.name || playTurn === enemy.name}>
                <div class="fight-turn-counter">Tour {turn}</div>
                {#if playTurn === player.name}
                <p>À VOUS DE JOUER !</p>
                {/if}
                {#if playerIsDead}
                <p>VOUS AVEZ PERDU !</p>
                {/if}
                {#if enemyIsDead}
                <p>VOUS AVEZ GAGNÉ !</p>
                {/if}
            </div>

            <div class="enemy" class:is-active={playTurn === enemy.name}>
                <div class="enemy-name-class">
                    <p>{ enemy.name }</p>
                    <p>Class</p>
                </div>

                <div class="enemy-bars">
                    <div class="health">
                        <div class="health-text">
                            <p class="hp">HP</p>
                            <p>{`${enemy.statistics.hp <= 0 ? 0 : enemy.statistics.hp} / ${enemy.baseStatistics.hp}`}</p>
                        </div>
                        <div class="healthbar">
                            <div style={`width: ${enemy.statistics.hp <= 0 ? 0 : (enemy.statistics.hp * 100) / enemy.baseStatistics.hp}%`} class="health-fill"></div>
                        </div>
                    </div>
                </div>

                <div class="statistics">
                    <p><span>STR</span> {`${enemy.statistics.str}`}</p>
                    <p><span>ARM</span> {`${enemy.statistics.arm}`}</p>
                    <p><span>SPEED</span> {`${enemy.statistics.speed}`}</p>
                    <p><span>CRIT %</span> {`${Math.round(enemy.statistics.critChance.toFixed(1) * 100)}`}</p>
                    <p><span>CRIT DMG%</span> {`${Math.round(enemy.statistics.critDamage.toFixed(1) * 100)}`}</p>
                </div>
                <div class="passives">
                    {#each enemyPassivesList as passive}
                        {#if passive.display}
                            <div class="passive">
                                <div class="passive-info">{passive.description}</div>
                                <p>{passive.stacks > 0 ? `${passive.name}: ${passive.stacks}` : `${passive.name}`}</p>
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="buffs-debuffs">
                    {#each enemyBuffsList as buff}
                        {#if buff.state}
                            <p class="buff">{buff.name}</p>
                        {/if}
                    {/each}
                    <!-- <p class="debuff">Debuff</p> -->
                </div>
            </div>
        </section>

        <section class="characters-fight">
            <div class="fight-zone">
                <div class="characters">
                    <div class="character-portrait player-portrait" class:is-hit={playerIsHit}>
                        <img
                            src={ player.image }
                            alt=""
                        />
                        {#if playerDamagePopup}
                            {#key playerDamagePopup.id}
                                <span class="damage-popup">-{playerDamagePopup.value}</span>
                            {/key}
                        {/if}
                    </div>

                    <div class="character-portrait enemy-portrait" class:is-hit={enemyIsHit}>
                        <img
                            src={ enemy.image }
                            alt=""
                        />
                        {#if enemyDamagePopup}
                            {#key enemyDamagePopup.id}
                                <span class="damage-popup">-{enemyDamagePopup.value}</span>
                            {/key}
                        {/if}
                    </div>
                </div>
            </div>
        </section>
        <section class="utilities">

            <div class="spells">
                <div class="title">
                    <p>Sorts</p>
                </div>
                {#each playerSpellsList as spell}
                    <div
                        class="spell"
                        class:is-cooldown={Utilities.checkSpellIsOnCooldown(
                            spell,
                            player.spells,
                        )}
                        onclick={() => {
                            determineAction(authUser, spell.name, player.name);
                        }}
                    >
                    {#if Utilities.checkSpellIsOnCooldown(spell, player.spells)}
                        <span class="veil">
                            <p>{ player.spells.find(element => element.name === spell.name).currentCooldown }</p>
                        </span>
                    {/if}
                        <img
                            class="spell-icon"
                            src={spell.image}
                            alt={spell.name}
                        />
                        <div class="spell-info">
                            <img
                                class="icon-info"
                                src="/images/ui/icons/information.png"
                                alt=""
                            />
                            <div class="text-info">
                                <p class="inventory-tooltip-title">{spell.name}</p>
                                <p>{spell.description}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="logs">
                <div class="logs-header">
                    <div class="title">
                        <p>Journaux de combat</p>
                    </div>
                    <div class="switch">
                        <button class="switch-button" onclick={() => {switchText()}}>Switch</button>
                    </div>
                </div>
                <div class="text" class:is-reverse={playerParameters.logReverse}>
                    {#each logs as line}
                        <p>
                            {#each fight.buildLogsText(line) as word}
                                {#if word.style}
                                    <span style={word.style}>{word.text}</span>
                                {:else}
                                    {word.text}
                                {/if}
                            {/each}
                        </p>
                    {/each}
                </div>
            </div>

            <div class="inventory">
                <div class="title">
                    <p>Inventaire</p>
                </div>
                <div class="inventory-content">
                    <div class="inventory-group">
                        <p class="inventory-group-title">Objets</p>
                        <div class="inventory-list">
                            {#each inventoryObjects as object}
                                <div class="inventory-slot">
                                    <img class="inventory-icon" src={object.icon} alt={object.name} />
                                    <div class="spell-info">
                                        <img
                                            class="icon-info"
                                            src="/images/ui/icons/information.png"
                                            alt=""
                                        />
                                        <div class="text-info inventory-tooltip">
                                            <p class="inventory-tooltip-title">{object.name}</p>
                                            <p>{object.description}</p>
                                            <p class="inventory-tooltip-count">Quantite: x{object.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="inventory-group">
                        <p class="inventory-group-title">Consommables</p>
                        <div class="inventory-list">
                            {#each inventoryConsumables as consumable}
                                <button type="button" class="inventory-slot is-consumable">
                                    <img class="inventory-icon" src={consumable.icon} alt={consumable.name} />
                                    <div class="spell-info">
                                        <img
                                            class="icon-info"
                                            src="/images/ui/icons/information.png"
                                            alt=""
                                        />
                                        <div class="text-info inventory-tooltip">
                                            <p class="inventory-tooltip-title">{consumable.name}</p>
                                            <p>{consumable.description}</p>
                                            <p class="inventory-tooltip-count">Quantite: x{consumable.quantity}</p>
                                        </div>
                                    </div>
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </section>
</main>
{/if}

<style>
    main {
        display: flex;
        flex-direction: column;
        padding-top: 5.5rem;
        padding-bottom: clamp(1.5rem, 3vh, 2.5rem);
        flex: 1;
        position: relative;
        isolation: isolate;
    }

    .characters-hp-stats {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        grid-template-areas: "player turn enemy";
        gap: 1.25rem;
        align-items: center;
        max-width: 86rem;
        width: 100%;
        margin: clamp(1.5rem, 3vh, 1.8rem) auto 0;
        padding: 0 var(--page-gutter);
    }

    .player,
    .enemy {
        color: var(--color-white);
        width: 100%;
        max-width: 28rem;
        min-height: 16rem;
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        box-shadow:
            0 14px 34px var(--color-overlay-medium),
            inset 0 0 20px var(--color-overlay-soft);
        margin: 0;
        padding: 0.75rem;
        position: relative;
        overflow: visible;
    }

    .player.is-active,
    .enemy.is-active {
        animation: combatPulse 2.2s ease-in-out infinite;
        border-color: var(--color-border-accent);
        box-shadow:
            0 0 0 1px var(--color-border-accent),
            0 20px 45px var(--color-overlay-medium);
    }

    .player.is-active::after,
    .enemy.is-active::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        border: 1px solid var(--ui-border);
        box-shadow: inset 0 0 24px var(--shadow-soft-color);
        pointer-events: none;
    }

    .player::before,
    .enemy::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--color-accent-soft), transparent);
    }

    .player {
        grid-area: player;
        justify-self: start;
    }

    .enemy {
        grid-area: enemy;
        justify-self: end;
    }

    .player-name-class,
    .enemy-name-class {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.5rem 0.5rem 0.35rem;
        font-size: 1.2rem;
        font-family: "Pirata One", system-ui;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .player-bars,
    .enemy-bars {
        display: flex;
        flex-direction: column;
    }

    .health {
        background-color: var(--color-surface-soft);
        padding: 0.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        border: 1px solid var(--ui-border);
    }

    .health-text {
        color: var(--text-muted);
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.75rem;
        width: 90%;
    }

    .health-text p {
        font-size: 0.9rem;
    }

    .hp {
        color: var(--blood-red);
        letter-spacing: 0.08em;
    }

    .healthbar {
        height: 0.7rem;
        border-radius: var(--block-radius);
        width: 90%;
        background-color: var(--color-surface-base);
        overflow: hidden;
    }

    .health-fill {
        border-radius: var(--block-radius);
        height: 100%;
        background: linear-gradient(90deg, var(--blood-red), var(--blood-red-dark));
        box-shadow: none;
    }

    .statistics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        font-size: 0.9rem;
        background-color: var(--color-surface-soft);
        padding: 0.6rem;
        margin-top: 0.5rem;
        border: 1px solid var(--ui-border);
    }

    .statistics p {
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.45rem;
        padding: 0.42rem 0.5rem;
        border: 1px solid var(--color-border-accent);
        background: var(--color-surface-base);
        color: var(--text-body);
        font-variant-numeric: tabular-nums;
    }

    .statistics span {
        display: block;
        color: var(--color-accent-soft);
        padding-right: 0;
        font-size: 0.66rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .passives {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 0.4rem;
    }

    .passive {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .passives p {
        background: var(--color-overlay-strong);
        border-radius: var(--block-radius);
        padding: 0.34rem 0.62rem;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        border: 1px solid var(--color-border-accent);
        color: var(--text-primary);
        font-size: 0.78rem;
        line-height: 1.25;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .passive-info {
        position: absolute;
        top: calc(100% + 0.35rem);
        left: 50%;
        transform: translate(-50%, 4px);
        padding: 0.48rem 0.62rem;
        background: var(--color-overlay-strong);
        color: var(--text-primary);
        font-size: 12px;
        border-radius: var(--block-radius);
        border: 1px solid var(--color-border-accent);
        white-space: normal;
        min-width: 12rem;
        max-width: 14rem;
        line-height: 1.3;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
        z-index: 100000;
        box-shadow: 0 14px 34px var(--shadow-panel-color);
    }

    .passive:hover .passive-info {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
    }

    .buffs-debuffs {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .buffs-debuffs p {
        border-radius: var(--block-radius);
        padding: 0.34rem 0.62rem;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        border: 1px solid var(--color-border-accent);
        background: var(--color-overlay-strong);
        color: var(--text-primary);
        font-size: 0.78rem;
        line-height: 1.25;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .buff {
        border-color: var(--color-success) !important;
        color: var(--color-success) !important;
        box-shadow: inset 0 0 0 1px var(--color-success-soft);
    }

    .playing-turn {
        grid-area: turn;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
        justify-content: center;
        align-items: center;
        padding: 0 0.25rem;
    }

    .fight-turn-counter {
        margin: 0;
        color: var(--color-text-body);
        font-size: 0.82rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
    }

    .playing-turn p {
        color: var(--color-white);
        font-size: clamp(1.1rem, 2vw, 2.1rem);
        letter-spacing: 0.02em;
        text-align: center;
        font-family: "Pirata One", system-ui;
        text-transform: uppercase;
    }

    .playing-turn.is-active p {
        animation: turnBlink 1.8s ease-in-out infinite;
        color: var(--accent-gold);
        text-shadow: none;
    }

    .characters-fight {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: clamp(14rem, 32vh, 28rem);
        max-width: 86rem;
        margin: clamp(0.75rem, 2.5vh, 1.5rem) auto 0;
        padding: 0 var(--page-gutter);
    }

    .fight-zone {
        width: 100%;
        max-width: 86rem;
        height: 100%;
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        box-shadow: 0 18px 40px var(--shadow-panel-color);
        overflow: hidden;
    }

    .characters {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        width: 100%;
        height: 100%;
        padding: 0.5rem var(--zone-gutter) 1rem;
        gap: 1.25rem;
        overflow: hidden;
    }

    .character-portrait {
        position: relative;
        width: min(34%, 360px);
        height: 100%;
        max-height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        transform-origin: center bottom;
    }

    .character-portrait img {
        width: auto;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .enemy-portrait img {
        transform: scaleX(-1);
    }

    .character-portrait.is-hit {
        animation: characterShake 0.28s ease-in-out;
    }

    .damage-popup {
        position: absolute;
        bottom: 42%;
        left: 50%;
        transform: translate(-50%, 0);
        color: var(--color-white);
        font-family: "Pirata One", system-ui;
        font-size: clamp(1.15rem, 2vw, 2rem);
        letter-spacing: 0.04em;
        text-shadow:
            0 0 8px var(--color-danger),
            0 2px 8px var(--color-overlay-medium);
        pointer-events: none;
        z-index: 4;
        animation: damageFloat 0.9s ease-out forwards;
    }

    .utilities {
        display: grid;
        grid-template-columns: minmax(0, 7fr) minmax(0, 10fr) minmax(0, 3fr);
        gap: 1.5rem;
        align-items: stretch;
        max-width: 86rem;
        margin: clamp(0.75rem, 2vh, 1.25rem) auto clamp(0.5rem, 1.5vh, 1rem);
        padding: 0 var(--page-gutter);
    }

    .spells {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-content: start;
        gap: 0.65rem;
        color: var(--color-white);
        min-height: 18rem;
        height: clamp(20rem, 29vh, 30rem);
        width: 100%;
        margin-top: 0;
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        box-shadow: 0 14px 34px var(--shadow-panel-color);
        overflow: visible;
        position: relative;
        padding: 0 0.65rem 0.75rem;
    }

    .logs {
        color: var(--color-surface-base);
        min-height: 18rem;
        height: clamp(20rem, 29vh, 30rem);
        width: 100%;
        margin-top: 0;
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        overflow-y: auto;
        overflow-x: hidden;
        white-space: pre-wrap;
        box-sizing: border-box;
        box-shadow: 0 14px 34px var(--shadow-panel-color);
    }

    .inventory {
        color: var(--text-body);
        min-height: 18rem;
        height: clamp(20rem, 29vh, 30rem);
        width: 100%;
        background: var(--color-surface-base);
        border: 1px solid var(--color-border-accent);
        box-shadow: 0 14px 34px var(--shadow-panel-color);
        overflow: visible;
    }

    .logs-header {
        background-color: var(--color-surface-soft);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--ui-border-soft);
    }

    .title {
        background-color: var(--color-surface-soft);
        color: var(--color-white);
        display: flex;
        align-items: center;
        border-radius: var(--block-radius) var(--block-radius) 0 0;
        padding: 0.95rem 1rem;
        border-bottom: 1px solid var(--ui-border-soft);
        font-family: "Pirata One", system-ui;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .logs .title,
    .spells .title,
    .inventory .title {
        position: sticky;
        top: 0;
        z-index: 2;
    }

    .spells .title {
        grid-column: 1 / -1;
        margin: 0 -0.65rem 0.35rem;
    }

    .inventory-content {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        padding: 0.75rem;
    }

    .inventory-group {
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
    }

    .inventory-group-title {
        margin: 0;
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-accent-strong);
    }

    .inventory-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.55rem;
    }

    .inventory-slot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 / 1;
        padding: 0;
        border: 1px solid var(--ui-border);
        border-radius: var(--block-radius);
        background: var(--surface-4);
        overflow: visible;
    }

    .inventory-icon {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
        display: block;
    }

    button.inventory-slot {
        font: inherit;
        color: inherit;
    }

    .inventory-slot.is-consumable {
        cursor: pointer;
        transition: border-color 0.12s ease, background 0.12s ease, transform 0.12s ease;
    }

    .inventory-slot.is-consumable:hover {
        border-color: var(--color-border-accent);
        background: var(--color-surface-base);
        transform: translateY(-1px);
    }

    .inventory-slot.is-consumable:active {
        transform: translateY(0);
    }

    .inventory-slot.is-consumable:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
    }

    .inventory-slot .spell-info {
        top: 4px;
        right: 4px;
    }

    .inventory-slot .icon-info {
        width: 16px;
        height: 16px;
        cursor: help;
    }

    .text-info.inventory-tooltip {
        min-width: 12rem;
        max-width: 14rem;
        white-space: normal;
    }

    .inventory-tooltip p {
        margin: 0;
        line-height: 1.3;
    }

    .inventory-tooltip-title {
        font-family: "Pirata One", system-ui;
        color: var(--accent-gold);
        letter-spacing: 0.04em;
        margin-bottom: 0.22rem;
    }

    .inventory-tooltip-count {
        margin-top: 0.32rem !important;
        color: var(--color-accent-strong);
        font-size: 0.75rem;
        letter-spacing: 0.03em;
    }

    .text {
        color: var(--text-body);
        display: flex;
        flex-direction: column;
        padding: 0.5rem 1rem;
        font-size: 0.95rem;
        line-height: 1.35;
    }

    .text.is-reverse {
        flex-direction: column-reverse;
    }

    .switch button {
        margin-right: 1rem;
    }

    .switch-button {
        border: 1px solid var(--color-border-accent);
        background:
            linear-gradient(180deg, var(--blood-red), var(--blood-red-dark)),
            url("https://www.transparenttextures.com/patterns/dark-leather.png");
        color: var(--color-white);
        font-family: inherit;
        font-weight: var(--font-weight-semibold);
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        padding: 0.45rem 0.9rem;
        border-radius: var(--block-radius);
        box-shadow: 0 10px 24px var(--shadow-soft-color), inset 0 1px 0 var(--color-white-soft);
        cursor: pointer;
        transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease, filter 0.12s ease;
    }

    .switch-button:hover {
        transform: translateY(-1px);
        border-color: var(--color-accent-strong);
        box-shadow: 0 12px 26px var(--color-overlay-medium), inset 0 1px 0 var(--color-white-soft);
        filter: brightness(1.05);
    }

    .switch-button:active {
        transform: translateY(0);
        filter: brightness(0.98);
    }

    .spell {
        --spell-size: 115px;
        border-radius: var(--block-radius);
        margin: 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        width: var(--spell-size);
        min-height: var(--spell-size);
    }

    .spell-icon {
        border-radius: var(--block-radius);
        cursor: pointer;
        display: block;
        width: var(--spell-size);
        height: var(--spell-size);
        transition: transform 0.12s ease, filter 0.12s ease;
        border: 2px solid var(--color-border-accent);
        box-shadow: 0 10px 24px var(--shadow-soft-color);
    }

    .spell:hover .spell-icon {
        transform: translateY(-1px);
        filter: brightness(1.08);
    }

    .spell.is-cooldown .spell-icon,
    .spell.is-cooldown:hover .spell-icon {
        transform: none;
        filter: none;
    }

    .veil {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--spell-size);
        height: var(--spell-size);
        background: var(--color-overlay-strong);
        pointer-events: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--block-radius);
        border: 2px solid var(--color-border-accent);
    }

    .spell-info {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 5;
    }

    .icon-info {
        width: 20px;
        height: 24px;
        cursor: pointer;
    }

    .text-info {
        position: absolute;
        top: 110%;
        right: 0;
        padding: 0.48rem 0.62rem;
        background: var(--color-overlay-strong);
        color: var(--text-primary);
        font-size: 12px;
        border-radius: var(--block-radius);
        border: 1px solid var(--color-border-accent);
        white-space: normal;
        min-width: 12rem;
        max-width: 14rem;
        line-height: 1.3;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(4px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
        z-index: 100000;
        box-shadow: 0 14px 34px var(--shadow-panel-color);
    }

    .text-info p {
        margin: 0;
    }

    .spell-info:hover .text-info {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    @keyframes characterShake {
        0% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(-4px);
        }
        40% {
            transform: translateX(4px);
        }
        60% {
            transform: translateX(-3px);
        }
        80% {
            transform: translateX(3px);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes damageFloat {
        0% {
            opacity: 0;
            transform: translate(-50%, 8px) scale(0.96);
        }
        15% {
            opacity: 1;
            transform: translate(-50%, -2px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -52px) scale(1.04);
        }
    }

    @keyframes combatPulse {
        0% {
            transform: translateY(0);
            box-shadow: 0 14px 34px var(--color-overlay-medium);
            filter: brightness(1);
        }
        50% {
            transform: translateY(-2px);
            box-shadow: 0 22px 50px var(--color-overlay-medium);
            filter: brightness(1.06);
        }
        100% {
            transform: translateY(0);
            box-shadow: 0 14px 34px var(--color-overlay-medium);
            filter: brightness(1);
        }
    }

    @keyframes turnBlink {
        0%,
        100% {
            opacity: 0.55;
            transform: translateY(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-2px);
        }
    }

    @media (max-width: 1100px) {
        .characters-hp-stats {
            grid-template-columns: 1fr;
            grid-template-areas:
                "turn"
                "player"
                "enemy";
            gap: 1rem;
            margin-top: 1.75rem;
        }

        .player,
        .enemy {
            max-width: none;
            justify-self: stretch;
        }

        .playing-turn {
            padding: 0.25rem 0;
        }

        .utilities {
            grid-template-columns: 1fr;
            justify-content: stretch;
            padding: 0 var(--page-gutter);
        }

        .logs,
        .spells,
        .inventory {
            max-width: none;
        }

    }

    @media (max-width: 700px) {
        .characters-fight {
            height: clamp(16rem, 55vw, 24rem);
        }

        .statistics {
            grid-template-columns: repeat(2, 1fr);
        }

        .spell {
            --spell-size: 96px;
            margin: 0 auto;
        }

        .spell-icon {
            width: var(--spell-size);
            height: var(--spell-size);
        }

    }
</style>
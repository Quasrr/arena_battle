import BattleStore from '../scripts/BattleStore.js';
import DeathKnight from '../scripts/characters/DeathKnight.js';
import Baron from '../scripts/characters/Baron.js';
import Fight from '../scripts/utils/Fight.js';

class FightController {

    // méthode d'instance qui initialise un combat en utilisant BattleStore
    initialiseBattle(_req, res) {
        const battle = BattleStore.createBattle();
        const { id, player, enemy, fight } = battle;

        const log = {
            text: `Un combat est engagé entre ${player.name} et ${enemy.name} !`,
            styles: [],
        }

        res.status(200).json({
            battleId: id,
            fightName: fight.fightName,
            player,
            enemy,
            log
        });
    }

    // méthode d'instance qui choisit quel personnage joue le tour
    chooseCharacterHitTurn(req, res) {
        const battleId = req.body.id;
        const battle = BattleStore.getBattle(battleId);

        const playerSpeed = battle.player.statistics.speed;
        const enemySpeed = battle.enemy.statistics.speed;

        const playerHitChance = battle.fight.calculateCharacterHitChance(playerSpeed);
        const enemyHitChance = battle.fight.calculateCharacterHitChance(enemySpeed);

        const toPlay = battle.fight.chooseCharacterHitTurn(playerHitChance, enemyHitChance);

        res.status(200).json(toPlay);
    }

    reduceCharacterSpellsCooldown(req, res) {
        const battleId = req.body.id;
        const charName = req.body.name;

        const battle = BattleStore.getBattle(battleId);
        
        const char = Object.values(battle).find(element => element.name === charName);

        battle.fight.reduceCharacterSpellsCooldown(char.spells);

        res.status(200).json(char);
    }

    checkCharacterNegativeEffectStates(req, res) {
        const battleId = req.body.id;
        const charName = req.body.name;

        const battle = BattleStore.getBattle(battleId);

        const char = Object.values(battle).find(element => element.name === charName);
        console.log(char)
        let canPlay = true;
    }
}

export default new FightController();
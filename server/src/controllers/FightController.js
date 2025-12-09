import BattleStore from '../scripts/BattleStore.js';
import DeathKnight from '../scripts/characters/DeathKnight.js';
import Baron from '../scripts/characters/Baron.js';
import Fight from '../scripts/utils/Fight.js';

class FightController {

    initialiseBattle(req, res) {
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
    
    calculateCharacterHitChance(speed) {
        return Math.floor(Math.random() * speed);
    }

    chooseCharacterHitTurn(req, res) {
        const battleId = req.body.id;
        const battle = BattleStore.getBattle(battleId);

        const playerSpeed = battle.player.statistics.speed;
        const enemySpeed = battle.enemy.statistics.speed;

        const playerHitChance = battle.fight.calculateCharacterHitChance(playerSpeed);
        const enemyHitChance = battle.fight.calculateCharacterHitChance(enemySpeed);

        const toPlay = battle.fight.chooseCharacterHitTurn(playerHitChance, enemyHitChance);

        console.log(toPlay)
        res.status(200).json(toPlay);
    }
}

export default new FightController();
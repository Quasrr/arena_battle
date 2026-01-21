import BattleStore from '../scripts/BattleStore.js';
import Fight from '../scripts/utils/Fight.js';
import Utilities from '../scripts/utils/Utilities.js';

class FightController {

    // méthode d'instance qui démarre un combat en utilisant BattleStore
    async startBattle(req, res) {
        const currentBattle = req.params.id;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const { turn, data } = battle;
            const { player, enemy } = data;

            const log = {
                text: `Un combat est engagé entre ${player.name} et ${enemy.name} !`,
                styles: [],
            }

            res.status(200).json({
                player,
                enemy,
                turn,
                log,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui choisit quel personnage joue le tour
    async chooseCharacterHitTurn(req, res) {
        const currentBattle = req.params.id;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const { data } = battle;
            const { player, enemy } = data;

            const playerSpeed = player.statistics.speed;
            const enemySpeed = enemy.statistics.speed;

            const playerHitChance = Fight.calculateCharacterHitChance(playerSpeed);
            const enemyHitChance = Fight.calculateCharacterHitChance(enemySpeed);

            const toPlay = Fight.chooseCharacterHitTurn(playerHitChance, enemyHitChance);

            res.status(200).json(toPlay);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui réduit les temps de récupérations des sorts des personnages
    async reduceCharacterSpellsCooldown(req, res) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);
        
            const char = Object.values(battle.data).find(element => element.name === name);

            Fight.reduceCharacterSpellsCooldown(char.spells);

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.status(200).json(char);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui vérifie les états négatif des personnages
    async checkCharacterNegativeEffectStates(req, res) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const entry = Object.entries(battle.data).find(element => element[1].name === name);
            const [ key, savedChar ] = entry;

            const character = Fight.createCharacter(savedChar);
            
            const logs = [];

            character.negativeEffects.forEach(negate => {
                if (negate.state && negate.duration >= 0) {
                    logs.push(negate.applyNegativeEffect(character));
                    Fight.reduceCharacterNegativeEffectDuration(negate);
                }
            }) 

            battle.data[key] = character;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.status(200).json({
                character,
                log: logs
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui vérifie les buffs d'un personnage
    async checkCharacterBuffs(req, res) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const entry = Object.entries(battle.data).find(element => element[1].name === name);
            const [ key, savedChar ] = entry;

            const character = Fight.createCharacter(savedChar);

            character.buffs.forEach(buff => {
                buff.checkBuff(character);
            });

            battle.data[key] = character;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.status(200).json(character);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async checkCharacterDebuffs(req, res) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const entry = Object.entries(battle.data).find(element => element[1].name === name);
            const [ key, savedChar ] = entry;

            const character = Fight.createCharacter(savedChar);

            character.debuffs.forEach(debuff => {
                debuff.checkDebuff(character);
            });

            battle.data[key] = character;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.status(200).json(character);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui utilise les passifs des personnages
    async passivePerTurn(req, res) {
        const currentBattle = req.params.id;
        const { targetName, selfName } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const targetEntry = Object.entries(battle.data).find(element => element[1].name === targetName);
            const [ targetKey, targetSavedChar ] = targetEntry;

            const selfEntry = Object.entries(battle.data).find(element => element[1].name === selfName);
            const [ selfKey, selfSavedChar ] = selfEntry;

            const target = Fight.createCharacter(targetSavedChar);
            const self = Fight.createCharacter(selfSavedChar);

            self.perTurn(target, self);

            battle.data[targetKey] = target;
            battle.data[selfKey] = self;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.status(200).json(self);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui vérifie les conditions d'utilisation des sorts du joueur
    async determinePlayerAction(req, res) {
        const currentBattle = req.params.id;
        const act = req.query.action;
        const name = req.query.name;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const savedChar = Object.values(battle.data).find(element => element.name === name);
            const player = Fight.createCharacter(savedChar);

            const spell = player.spells.find(spell => spell.name === act);

            const action = spell.canUseSpell(player) ? spell.name : undefined;

            res.status(200).json({ action });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui vérifie les conditions d'utilisation des sorts de l'adversaire
    async determineEnemyAction(req, res) {
        const currentBattle = req.params.id;
        const name = req.query.name;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const savedChar = Object.values(battle.data).find(element => element.name === name);

            const self = Fight.createCharacter(savedChar);

            const availableSpells = self.spells.filter(spell => {
                return spell.canUseSpell(self);
            })

            const randomIndex = Utilities.getRandomInt(availableSpells.length);
            let action = availableSpells.length > 1 ? availableSpells[randomIndex].name : availableSpells[0].name;
            
            res.status(200).json({ action });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui utilise les sorts d'un personnage
    async characterUseSpell(req, res) {
        const currentBattle = req.params.id;
        const { actionName, targetName, selfName, turn } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const targetEntry = Object.entries(battle.data).find(element => element[1].name === targetName);
            const [ targetKey, targetSavedChar ] = targetEntry;

            const selfEntry = Object.entries(battle.data).find(element => element[1].name === selfName);
            const [ selfKey, selfSavedChar ] = selfEntry;

            const target = Fight.createCharacter(targetSavedChar);
            const self = Fight.createCharacter(selfSavedChar);

            const spell = self.spells.find(element => element.name === actionName);

            let log = spell.useSpell(target, self, battle);

            battle.data[targetKey] = target;
            battle.data[selfKey] = self;

            await BattleStore.updateBattleData(battle.data, currentBattle);
            await BattleStore.updateBattleTurn(turn, currentBattle);

            res.status(200).json({
                target,
                self,
                log
            })
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async checkCharacterAlive(req, res) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            const character = Object.values(battle.data).find(element => element.name === name);

            let state = false;

            if (character.statistics.hp <= 0) {
                state = true;

                await BattleStore.deleteUserCurrentBattle(id);
            }

            return res.status(200).json(state);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new FightController();
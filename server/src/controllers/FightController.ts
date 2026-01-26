import type { Request, Response } from 'express';
import BattleStore from '../scripts/BattleStore.ts';
import Fight from '../scripts/utils/Fight.ts';
import Utilities from '../scripts/utils/Utilities.ts';
import type { CharacterData, FightingLog } from '../types.ts';

type BattleData = {
    player: CharacterData;
    enemy: CharacterData;
};

class FightController {

    // méthode d'instance qui démarre un combat en utilisant BattleStore
    async startBattle(req: Request, res: Response) {
        const currentBattle = req.params.id;
        
        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const { turn, data } = battle;
            const { player, enemy } = data as BattleData;

            const log = {
                text: `Un combat est engagé entre ${player.name} et ${enemy.name} !`,
                styles: [],
            };

            res.status(200).json({
                player,
                enemy,
                turn,
                log,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    };

    // méthode d'instance qui choisit quel personnage joue le tour
    async chooseCharacterHitTurn(req: Request, res: Response) {
        const currentBattle = req.params.id;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const { data } = battle;
            const { player, enemy } = data as BattleData;

            const playerSpeed = player.statistics.speed;
            const enemySpeed = enemy.statistics.speed;

            const playerHitChance = Fight.calculateCharacterHitChance(playerSpeed);
            const enemyHitChance = Fight.calculateCharacterHitChance(enemySpeed);

            const toPlay = Fight.chooseCharacterHitTurn(playerHitChance, enemyHitChance);

            res.status(200).json(toPlay);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    };

    // méthode d'instance qui réduit les temps de récupérations des sorts des personnages
    async reduceCharacterSpellsCooldown(req: Request, res: Response) {
        const currentBattle = req.params.id;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };
        
        const { name } = req.body;

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;
        
            const data = battle.data as BattleData;
            const char = Object.values(data).find(element => element.name === name);

            if (!char) throw new Error;

            Fight.reduceCharacterSpellsCooldown(char.spells);

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.status(200).json(char);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui vérifie les états négatif des personnages
    async checkCharacterNegativeEffectStates(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const entry = Object.entries(data).find(element => element[1].name === name);

            if (!entry) throw new Error;

            const [ keyRaw, savedChar ] = entry;
            const key = keyRaw as keyof BattleData;

            const character = Fight.createCharacter(savedChar);

            if (!character) throw new Error;
            
            const logs: Array<FightingLog> = [];

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
    async checkCharacterBuffs(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const entry = Object.entries(data).find(element => element[1].name === name);

            if (!entry) throw new Error;

            const [ keyRaw, savedChar ] = entry;
            const key = keyRaw as keyof BattleData;

            const character = Fight.createCharacter(savedChar);

            if (!character) throw new Error;

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

    async checkCharacterDebuffs(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const entry = Object.entries(data).find(element => element[1].name === name);

            if (!entry) throw new Error;

            const [ keyRaw, savedChar ] = entry;
            const key = keyRaw as keyof BattleData;

            const character = Fight.createCharacter(savedChar);

            if (!character) throw new Error;

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
    async passivePerTurn(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { targetName, selfName } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof targetName !== 'string' || typeof selfName !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const targetEntry = Object.entries(data).find(element => element[1].name === targetName);

            if (!targetEntry) throw new Error;

            const [ targetKeyRaw, targetSavedChar ] = targetEntry;
            const targetKey = targetKeyRaw as keyof BattleData;

            const selfEntry = Object.entries(data).find(element => element[1].name === selfName);

            if (!selfEntry) throw new Error;

            const [ selfKeyRaw, selfSavedChar ] = selfEntry;
            const selfKey = selfKeyRaw as keyof BattleData;

            const target = Fight.createCharacter(targetSavedChar);
            const self = Fight.createCharacter(selfSavedChar);

            if (!target || !self) throw new Error;

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
    async determinePlayerAction(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const act = req.query.action;
        const name = req.query.name;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof act !== 'string' || typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid action or name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const savedChar = Object.values(data).find(element => element.name === name);

            if (!savedChar) throw new Error;

            const player = Fight.createCharacter(savedChar);

            if (!player) throw new Error;

            const spell = player.spells.find(spell => spell.name === act);

            if (!spell) {
                return res.status(200).json({ action: undefined });
            }

            const action = spell.canUseSpell(player) ? spell.name : undefined;

            res.status(200).json({ action });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui vérifie les conditions d'utilisation des sorts de l'adversaire
    async determineEnemyAction(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const name = req.query.name;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const savedChar = Object.values(data).find(element => element.name === name);

            if (!savedChar) throw new Error;

            const self = Fight.createCharacter(savedChar);

            if (!self) throw new Error;

            const availableSpells = self.spells.filter(spell => {
                return spell.canUseSpell(self);
            })

            if (availableSpells.length === 0) {
                return res.status(200).json({ action: null });
            }

            const randomIndex = Utilities.getRandomInt(availableSpells.length);
            const chosenSpell = availableSpells.length > 1 ? availableSpells[randomIndex] : availableSpells[0];

            if (!chosenSpell) throw new Error;

            const action = chosenSpell.name;
            
            res.status(200).json({ action });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // méthode d'instance qui utilise les sorts d'un personnage
    async characterUseSpell(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { actionName, targetName, selfName, turn } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof actionName !== 'string' || typeof targetName !== 'string' || typeof selfName !== 'string') {
            return res.status(400).json({ error: "Invalid action or name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const targetEntry = Object.entries(data).find(element => element[1].name === targetName);

            if (!targetEntry) throw new Error;

            const [ targetKeyRaw, targetSavedChar ] = targetEntry;
            const targetKey = targetKeyRaw as keyof BattleData;

            const selfEntry = Object.entries(data).find(element => element[1].name === selfName);

            if (!selfEntry) throw new Error;

            const [ selfKeyRaw, selfSavedChar ] = selfEntry;
            const selfKey = selfKeyRaw as keyof BattleData;

            const target = Fight.createCharacter(targetSavedChar);
            const self = Fight.createCharacter(selfSavedChar);

            if (!target || !self) throw new Error;

            const spell = self.spells.find(element => element.name === actionName);

            if (!spell) throw new Error;

            let log = spell.useSpell(target, self);

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

    async checkCharacterAlive(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { name, userId } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            return res.status(400).json({ error: "Invalid id" });
        };

        if (typeof name !== 'string') {
            return res.status(400).json({ error: "Invalid name" });
        }

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new Error;

            const data = battle.data as BattleData;
            const character = Object.values(data).find(element => element.name === name);

            if (!character) throw new Error;

            let state = false;

            if (character.statistics.hp <= 0) {
                state = true;

                if (typeof userId === 'string') {
                    await BattleStore.deleteUserCurrentBattle(userId);
                }
            }

            return res.status(200).json(state);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new FightController();

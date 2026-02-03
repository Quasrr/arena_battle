import type { Request, Response } from 'express';
import BattleStore from '../scripts/BattleStore.ts';
import Fight from '../scripts/utils/Fight.ts';
import Utilities from '../scripts/utils/Utilities.ts';
import type { BattleData, FightingLog } from '../types.ts';
import { BadRequestError, NotFoundError } from '../scripts/utils/Error.ts';
import ErrorHandler from '../scripts/ErrorHandler.ts';

class FightController {

    // méthode d'instance qui démarre un combat en utilisant BattleStore
    async startBattle(req: Request, res: Response) {
        try {
            const currentBattle = req.params.id;
            
            if (!currentBattle || Array.isArray(currentBattle)) {
                throw new BadRequestError("Invalid id");
            };
            
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const { turn, data } = battle;
            const { player, enemy } = data as BattleData;

            const log = {
                text: `Un combat est engagé entre ${player.name} et ${enemy.name} !`,
                styles: [],
            };

            res.send({
                player,
                enemy,
                turn,
                log,
            });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui choisit quel personnage joue le tour
    async chooseCharacterHitTurn(req: Request, res: Response) {
        try {
            const currentBattle = req.params.id;

            if (!currentBattle || Array.isArray(currentBattle)) {
                throw new BadRequestError("Invalid id");
            };

            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const { data } = battle;
            const { player, enemy } = data as BattleData;

            const playerSpeed = player.statistics.speed;
            const enemySpeed = enemy.statistics.speed;

            const playerHitChance = Fight.calculateCharacterHitChance(playerSpeed);
            const enemyHitChance = Fight.calculateCharacterHitChance(enemySpeed);

            const toPlay = Fight.chooseCharacterHitTurn(playerHitChance, enemyHitChance);

            res.send(toPlay);
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui réduit les temps de récupérations des sorts des personnages
    async reduceCharacterSpellsCooldown(req: Request, res: Response) {
        try {
            const currentBattle = req.params.id;

            if (!currentBattle || Array.isArray(currentBattle)) {
                throw new BadRequestError("Invalid id");
            };
            
            const { name } = req.body;

            if (typeof name !== 'string') {
                throw new BadRequestError("Invalid name");
            };

            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");
        
            const data = battle.data as BattleData;
            const char = Object.values(data).find(element => element.name === name);

            if (!char) throw new NotFoundError("Character not found");

            Fight.reduceCharacterSpellsCooldown(char.spells);

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.send(char);
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui vérifie les états négatif des personnages
    async checkCharacterNegativeEffectStates(req: Request, res: Response) {
        try {
            const currentBattle = req.params.id;
            const { name } = req.body;

            if (!currentBattle || Array.isArray(currentBattle)) {
                throw new BadRequestError("Invalid id");
            };

            if (typeof name !== 'string') {
                throw new BadRequestError("Invalid name");
            };

            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const data = battle.data as BattleData;
            const entry = Object.entries(data).find(element => element[1].name === name);

            if (!entry) throw new Error;

            const [ keyRaw, savedChar ] = entry;
            const key = keyRaw as keyof BattleData;

            const character = Fight.createCharacter(savedChar);

            if (!character) throw new NotFoundError("Character not found");
            
            const logs: Array<FightingLog> = [];

            character.negativeEffects.forEach(negate => {
                if (negate.state && negate.duration >= 0) {
                    logs.push(negate.applyNegativeEffect(character));
                    Fight.reduceCharacterNegativeEffectDuration(negate);
                };
            });

            battle.data[key] = character;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.send({
                character,
                log: logs
            });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui vérifie les buffs d'un personnage
    async checkCharacterBuffs(req: Request, res: Response) {
        try {
            const currentBattle = req.params.id;
            const { name } = req.body;

            if (!currentBattle || Array.isArray(currentBattle)) {
                throw new BadRequestError("Invalid id");
            };

            if (typeof name !== 'string') {
                throw new BadRequestError("Invalid name");
            };

        
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const data = battle.data as BattleData;
            const entry = Object.entries(data).find(element => element[1].name === name);

            if (!entry) throw new Error;

            const [ keyRaw, savedChar ] = entry;
            const key = keyRaw as keyof BattleData;

            const character = Fight.createCharacter(savedChar);

            if (!character) throw new NotFoundError("Character not found");

            character.buffs.forEach(buff => {
                buff.checkBuff(character);
            });

            battle.data[key] = character;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.send(character);
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    async checkCharacterDebuffs(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { name } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            throw new BadRequestError("Invalid id");
        };

        if (typeof name !== 'string') {
            throw new BadRequestError("Invalid name");
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const data = battle.data as BattleData;
            const entry = Object.entries(data).find(element => element[1].name === name);

            if (!entry) throw new Error;

            const [ keyRaw, savedChar ] = entry;
            const key = keyRaw as keyof BattleData;

            const character = Fight.createCharacter(savedChar);

            if (!character) throw new NotFoundError("Character not found");

            character.debuffs.forEach(debuff => {
                debuff.checkDebuff(character);
            });

            battle.data[key] = character;

            await BattleStore.updateBattleData(battle.data, currentBattle);

            res.send(character);
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui utilise les passifs des personnages
    async passivePerTurn(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { targetName, selfName } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            throw new BadRequestError("Invalid id");
        };

        if (typeof targetName !== 'string' || typeof selfName !== 'string') {
            throw new BadRequestError("Invalid name");
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

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

            res.send(self);
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui vérifie les conditions d'utilisation des sorts du joueur
    async determinePlayerAction(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const act = req.query.action;
        const name = req.query.name;

        if (!currentBattle || Array.isArray(currentBattle)) {
            throw new BadRequestError("Invalid id");
        };

        if (typeof act !== 'string' || typeof name !== 'string') {
            throw new BadRequestError("Invalid name");
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const data = battle.data as BattleData;
            const savedChar = Object.values(data).find(element => element.name === name);

            if (!savedChar) throw new NotFoundError("Character not found");

            const player = Fight.createCharacter(savedChar);

            if (!player) throw new NotFoundError("Player not found");

            const spell = player.spells.find(spell => spell.name === act);

            if (!spell) {
                return res.send({ action: undefined });
            }

            const action = spell.canUseSpell(player) ? spell.name : undefined;

            res.send({ action });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui vérifie les conditions d'utilisation des sorts de l'adversaire
    async determineEnemyAction(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const name = req.query.name;

        if (!currentBattle || Array.isArray(currentBattle)) {
            throw new BadRequestError("Invalid id");
        };

        if (typeof name !== 'string') {
            throw new BadRequestError("Invalid name");
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const data = battle.data as BattleData;
            const savedChar = Object.values(data).find(element => element.name === name);

            if (!savedChar) throw new NotFoundError("Character not found");

            const self = Fight.createCharacter(savedChar);

            if (!self) throw new NotFoundError("Character not found");

            const availableSpells = self.spells.filter(spell => {
                return spell.canUseSpell(self);
            })

            if (availableSpells.length === 0) {
                return res.send({ action: null });
            }

            const randomIndex = Utilities.getRandomInt(availableSpells.length);
            const chosenSpell = availableSpells.length > 1 ? availableSpells[randomIndex] : availableSpells[0];

            if (!chosenSpell) throw new NotFoundError("Spell not found");

            const action = chosenSpell.name;
            
            res.send({ action });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    // méthode d'instance qui utilise les sorts d'un personnage
    async characterUseSpell(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { actionName, targetName, selfName, turn } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            throw new BadRequestError("Invalid id");
        };

        if (typeof actionName !== 'string' || typeof targetName !== 'string' || typeof selfName !== 'string') {
            throw new BadRequestError("Invalid name");
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

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

            if (!target || !self) throw new NotFoundError("Character not found");

            const spell = self.spells.find(element => element.name === actionName);

            if (!spell) throw new NotFoundError("Spell not found");

            let log = spell.useSpell(target, self);

            battle.data[targetKey] = target;
            battle.data[selfKey] = self;

            await BattleStore.updateBattleData(battle.data, currentBattle);
            await BattleStore.updateBattleTurn(turn, currentBattle);

            res.send({
                target,
                self,
                log
            });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };

    async checkCharacterAlive(req: Request, res: Response) {
        const currentBattle = req.params.id;
        const { name, userId } = req.body;

        if (!currentBattle || Array.isArray(currentBattle)) {
            throw new BadRequestError("Invalid id");
        };

        if (typeof name !== 'string') {
            throw new BadRequestError("Invalid name");
        };

        try {
            const battle = await BattleStore.getBattle(currentBattle);

            if (!battle) throw new NotFoundError("No battle found");

            const data = battle.data as BattleData;
            const character = Object.values(data).find(element => element.name === name);

            if (!character) throw new NotFoundError("Character not found");

            let state = false;

            if (character.statistics.hp <= 0) {
                state = true;
                await BattleStore.deleteUserCurrentBattle(userId);
            };

            return res.send(state);
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };
};

export default new FightController();
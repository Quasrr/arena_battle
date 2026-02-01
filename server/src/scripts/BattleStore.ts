import { prisma } from "../models/index.ts";
import crypto from 'crypto';
import type Character from './Character.ts';
import type { BattleData, BattleSchema } from '../types.ts';

class BattleStore {
    async createBattle(userId: number, playerCharacter: Character, enemyCharacter: Character) {
        const id = crypto.randomUUID();

        const player = playerCharacter;
        const enemy = enemyCharacter;

        const data = { player, enemy }

        const battle = await prisma.battle.create({
            data: {
                battleId: id,
                state: "running",
                turn: 1,
                data: JSON.stringify(data)
            }
        });

        const user = await prisma.user.update({
            where: { id: userId },
            data: { currentBattle: id }
        });

        await prisma.battleParticipant.create({
            data: {
                userId: user.id,
                battleId: battle.battleId
            }
        });

        return { id };
    };
    
    async getBattle(id: string) {
        const battle: BattleSchema | null = await prisma.battle.findUnique({ where: { battleId: id } });
        
        if (!battle) return;
        
        const { battleId, state, turn, data } = battle;

        return { battleId, state, turn, data: JSON.parse(data) as BattleData };
    };

    async updateBattleData(data: BattleData, id: string) {
        const battle = await prisma.battle.update({ where: { battleId: id }, data: { data: JSON.stringify(data) } });
    };

    async updateBattleTurn(turn: number, id: string) {
        const battle = await prisma.battle.update({ where: { battleId: id }, data: { turn } });
    };

    async deleteUserCurrentBattle(id: number) {
        const user = await prisma.user.update( { where: { id }, data: { currentBattle: null } });
    };
};

export default new BattleStore();
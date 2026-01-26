import { Battle } from '../models/Battle.ts';
import { User } from '../models/User.ts';
import crypto from 'crypto';
import type Character from './Character.ts';
import type { BattleData, BattleSchema } from '../types.ts';

class BattleStore {
    async createBattle(userId: number, playerCharacter: Character, enemyCharacter: Character) {
        const id = crypto.randomUUID();

        const player = playerCharacter;
        const enemy = enemyCharacter;

        const data = { player, enemy }

        const battle = await Battle.create({
            battleId: id,
            state: "running",
            turn: 1,
            data: JSON.stringify(data)
        });

        const user = await User.update({ currentBattle: id }, { where: { id: userId } });

        return { id };
    };
    
    async getBattle(id: string) {
        const battle: BattleSchema | null = await Battle.findOne({ where: { battleId: id } });
        
        if (!battle) return;
        
        const { battleId, state, turn, data } = battle.dataValues;

        return { battleId, state, turn, data: JSON.parse(data) as BattleData };
    };

    async updateBattleData(data: BattleData, id: string) {
        const battle = await Battle.update({ data: JSON.stringify(data) }, { where: { battleId: id } });
    };

    async updateBattleTurn(turn: number, id: string) {
        const battle = await Battle.update({ turn }, { where: { battleId: id } });
    };

    async deleteUserCurrentBattle(id: string) {
        const user = await User.update({ currentBattle: null }, { where: { id: id } });
    };
};

export default new BattleStore();
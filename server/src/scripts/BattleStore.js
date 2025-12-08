import DeathKnight from './characters/DeathKnight.js';
import Baron from './characters/Baron.js';
import Fight from './utils/Fight.js';
import crypto from 'crypto';

class BattleStore {
    battles = new Map();

    createBattle() {
        const id = crypto.randomUUID();

        const player = new DeathKnight('Verso');
        const enemy = new Baron('Baron');
        const fight = new Fight('Test Fight');

        this.battles.set(id, { id, player, enemy, fight});
        return this.battles.get(id);
    }
    
    getBattle(id) {
        return this.battles.get(id) ?? null;
    }

    deleteBattle(id) {
        this.battles.delete(id);
    }
}

export default new BattleStore();
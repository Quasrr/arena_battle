import type Character from "../Character.ts";
import Passive from "../Passive.ts";

export default class SoulsScalingPassive extends Passive {
    constructor() {
        super({
            name: 'Souls',
            display: true,
            description: "Gathered Souls, give stats to the DeathKnight",
            stacks: 1
        });
    };

    onTurn(target: Character, self: Character) { // méthode appelée au début du tour du personnage, gère les passifs du personnage
        const highSpeed = self.buffs.find(buff => buff.name === 'High Speed');

        if (!highSpeed) {
            self.statistics.speed = Math.floor(self.baseStatistics.speed + (0.1 * this.stacks));
        };

        self.statistics.str = Math.floor(self.baseStatistics.str + (1 * this.stacks));
        self.statistics.arm = Math.floor(self.baseStatistics.arm + (0.5 * this.stacks));
        self.statistics.critChance = self.baseStatistics.critChance + (0.01 * this.stacks);
        self.statistics.critDamage = self.baseStatistics.critDamage + (0.01 * this.stacks);
    };

    onHit(target: Character, self: Character) {}; // méthode appelée dès que le personnage prends un coups, gère les réactions à ce dernier
};
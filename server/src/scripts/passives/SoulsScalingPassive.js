import Passive from "../Passive.js";

class SoulsScalingPassive extends Passive {
    constructor() {
        const data = {
            name: 'Souls',
            display: true,
            description: "Gathered Souls, give stats to the DeathKnight",
            stacks: 1
        }

        super(data);
    }

    onTurn(target, self) { // méthode appelée au début du tour du personnage, gère les passifs du personnage
        self.statistics.STR = Math.floor(self.statistics.STR + (0.5 * this.stacks));
        self.statistics.ARM = Math.floor(self.statistics.ARM + (0.5 * this.stacks));
        self.statistics.speed = Math.floor(self.statistics.speed + (0.1 * this.stacks));
        self.statistics.CritChance = self.statistics.CritChance + (0.01 * this.stacks);
        self.statistics.CritDamage = self.statistics.CritDamage + (0.01 * this.stacks);
    }

    onHit(target, self) {} // méthode appelée dès que le personnage prends un coups, gère les réactions à ce dernier
}

export default SoulsScalingPassive;
import type Character from "../Character.ts";
import Passive from "../Passive.ts";
import Fight from "../utils/Fight.ts";

class CounterStrikePassive extends Passive {
    constructor() {
        super({
            name: 'Counter Strike',
            display: false,
            description: "Counter Strike",
            stacks: 0
        });
    }

    onTurn(target: Character, self: Character) {} // méthode appelée au début du tour du personnage, gère les passifs du personnage

    onHit(target: Character, self: Character) { // méthode appelée dès que le personnage prends un coups, gère les réactions à ce dernier
        const counterStrike = self.buffs.find(element => {
            return element.name === "Counter Strike";
        })

        const stun = self.negativeEffects.find(element => {
            return element.name === "Stun";
        })

        if (counterStrike?.state && !stun?.state) {
            let damage = Math.round(Fight.calculateCharacterDamage(self.statistics.str, target.statistics.arm) / 2);
            target.statistics.str -= damage;

            return {
                text: `${self.name} contre attaque et inflige ${damage} points de dégâts`,
                styles:
                    [
                        { word: `contre`, color: 'grey' },
                        { word: `attaque`, color: 'grey' },
                        { word: `${damage}`, color: 'yellow' },
                    ]
            };
        }
    }
}

export default CounterStrikePassive;
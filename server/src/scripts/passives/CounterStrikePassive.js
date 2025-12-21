import Passive from "../Passive.js";

class CounterStrikePassive extends Passive {
    constructor() {
        const data = {
            name: 'Counter Strike',
            display: false
        }
        
        super(data);
    }

    onTurn(target, self) {} // méthode appelée au début du tour du personnage, gère les passifs du personnage

    onHit(target, self, battle) { // méthode appelée dès que le personnage prends un coups, gère les réactions à ce dernier
        const counterStrike = self.buffs.find(element => {
            return element.name === "Counter Strike";
        })

        const stun = self.negativeEffects.find(element => {
            return element.name === "Stun";
        })

        if (counterStrike.state && !stun.state) {
            let damage = Math.round(battle.fight.calculateCharacterDamage(self.statistics.STR, target.statistics.ARM) / 2);
            target.statistics.HP -= damage;

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
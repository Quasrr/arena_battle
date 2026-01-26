import type Character from "../Character.ts";
import NegativeEffects from "../NegativeEffects.ts";

class Poison extends NegativeEffects {
    constructor() {
        super({
            name: "Poison",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        });
    };

    applyNegativeEffect(self: Character) {
        self.statistics.hp -= this.damage;
        
        return {
            text: `${self.name} est empoisonné et subit ${this.damage} points de dégats d' empoisonnement!`,
            styles:
                [
                    { word: `${this.damage}`, color: 'purple' },
                    { word: `empoisonnement`, color: 'purple' }
                ]
        }
    }
}

export default Poison;
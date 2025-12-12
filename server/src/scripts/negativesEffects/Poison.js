import NegativeEffects from "../NegativeEffects.js";

class Poison extends NegativeEffects {
    constructor() {
        const effectsData = {
            name: "Poison",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        };

        super(effectsData);
    }

    applyNegativeEffect(self) {
        self.statistics.HP -= this.damage;
        
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
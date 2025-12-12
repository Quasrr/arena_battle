import NegativeEffects from "../NegativeEffects.js";

class Burn extends NegativeEffects {
    constructor() {
        const effectsData = {
            name: "Burn",
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
            text: `${self.name} brûle et subit ${this.damage} points de dégats de brûlure!`,
            styles:
                [
                    { word: `${this.damage}`, color: 'orange' },
                    { word: `brûlure`, color: 'orange' }
                ]
        }
    }
}

export default Burn;
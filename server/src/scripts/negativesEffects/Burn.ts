import type Character from "../Character.ts";
import NegativeEffects from "../NegativeEffects.ts";

export default class Burn extends NegativeEffects {
    constructor() {
        super({
            name: "Burn",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        });
    };

    applyNegativeEffect(self: Character) {
        self.statistics.hp -= this.damage;
        
        return {
            text: `${self.name} brûle et subit ${this.damage} points de dégats de brûlure!`,
            styles:
                [
                    { word: `${this.damage}`, color: 'orange' },
                    { word: `brûlure`, color: 'orange' }
            ]
        };
    };
};
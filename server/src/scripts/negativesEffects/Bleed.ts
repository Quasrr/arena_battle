import type Character from "../Character.ts";
import NegativeEffects from "../NegativeEffects.ts";

export default class Bleed extends NegativeEffects {
    constructor() {
        super({
            name: "Bleed",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        });
    };

    applyNegativeEffect(self: Character) {
        self.statistics.hp -= this.damage;
        
        return {
            text: `${self.name} saigne et subit ${this.damage} points de dégats de saignement!`,
            styles:
                [
                    { word: `${this.damage}`, color: 'red' },
                    { word: `saignement`, color: 'red' }
            ]
        };
    };
};
import type Character from "../Character.ts";
import NegativeEffects from "../NegativeEffects.ts";

export default class Freeze extends NegativeEffects {
    constructor() {
        super({
            name: "Freeze",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        });
    };

    applyNegativeEffect(self: Character) {
        self.statistics.hp -= this.damage;
        
        return {
            text: `${self.name} est gelé et subit ${this.damage} points de dégats de gel!`,
            styles:
                [
                    { word: `${this.damage}`, color: 'lightblue' },
                    { word: `gel`, color: 'lightblue' }
            ]
        };
    };
};
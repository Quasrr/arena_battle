import type Character from "../Character.ts";
import NegativeEffects from "../NegativeEffects.ts";

export default class Slow extends NegativeEffects {
    constructor() {
        super({
            name: "Slow",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        });
    };

    applyNegativeEffect(self: Character) {
        self.statistics.hp -= this.damage;
        
        return {
            text: `${self.name} est ralentit et a du mal à avancer`,
            styles:
                []
        };
    };
};
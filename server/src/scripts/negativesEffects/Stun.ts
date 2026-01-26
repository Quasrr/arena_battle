import type Character from "../Character.ts";
import NegativeEffects from "../NegativeEffects.ts";

class Stun extends NegativeEffects {
    constructor() {
        super({
            name: "Stun",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        });
    };

    applyNegativeEffect(self: Character) {
        self.statistics.hp -= this.damage;
        
        return {
            text: `${self.name} est paralysé et ne peut pas attaquer`,
            styles:
                [
                    { word: `paralysé`, color: 'yellow' }
                ]
        }
    }
}

export default Stun;
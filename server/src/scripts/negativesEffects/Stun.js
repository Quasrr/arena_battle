import NegativeEffects from "../NegativeEffects.js";

class Stun extends NegativeEffects {
    constructor() {
        const effectsData = {
            name: "Stun",
            state: false,
            stacks: 0,
            duration: 0,
            damage: 0
        };

        super(effectsData);
    }

    applyNegativeEffect(self) {
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
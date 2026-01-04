import NegativeEffects from "../NegativeEffects.js";

class Slow extends NegativeEffects {
    constructor() {
        const effectsData = {
            name: "Slow",
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
            text: `${self.name} est ralentit et a du mal à avancer`,
            styles:
                []
        }
    }
}

export default Slow;
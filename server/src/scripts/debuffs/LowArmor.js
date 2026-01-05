import Debuff from "../Debuff.js";

class LowArmor extends Debuff {
    constructor() {
        const debuffData = {
            name: "Low Armor",
            state: false,
            isPermanent: false,
            duration: 0,
            quantity: 0
        }

        super(debuffData);
    }

    applyDebuff(self, duration) {
        if (this.isPermanent) {
            return;
        }

        this.state = true;
        this.duration = duration;
    }

    checkDebuff(self) {
        if (!this.state) {
            return;
        }

        if (this.duration > 0) {
            this.duration--;
        }

        if (this.duration === 0) {
            this.state = false;

            return
        }
    }
}

export default LowArmor;
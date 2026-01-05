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

    applyDebuff(self, duration, quantity) {
        if (this.isPermanent) {
            return;
        }

        this.state = true;
        this.duration = duration;
        this.quantity += quantity;
        self.statistics.arm -= this.quantity;
        self.baseStatistics.arm -= this.quantity;
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
            
            self.statistics.arm += this.quantity;
            self.baseStatistics.arm += this.quantity;
            this.quantity = 0;

            return
        }
    }
}

export default LowArmor;
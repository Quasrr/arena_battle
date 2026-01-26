import type Character from "../Character.ts";
import Debuff from "../Debuff.ts";

export default class LowStrength extends Debuff {
    constructor() {
        super({
            name: "Low Strength",
            state: false,
            isPermanent: false,
            duration: 0,
            quantity: 0
        });
    };

    applyDebuff(self: Character, duration: number, quantity: number) {
        if (this.isPermanent) {
            return;
        };

        this.state = true;
        this.duration = duration;
        this.quantity += quantity;
        self.statistics.str -= this.quantity;
    };

    checkDebuff(self: Character) {
        if (!this.state) {
            return;
        };

        if (this.duration > 0) {
            this.duration--;
        };

        if (this.duration === 0) {
            this.state = false;
            
            self.statistics.str += this.quantity;
            this.quantity = 0;

            return;
        };
    };
};
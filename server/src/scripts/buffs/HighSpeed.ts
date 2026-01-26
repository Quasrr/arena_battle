import Buff from "../Buff.ts";
import type Character from "../Character.ts";

export default class HighSpeed extends Buff {
    constructor() {
        super({
            name: "High Speed",
            state: false,
            isPermanent: false,
            duration: 0,
            quantity: 0
        });
    };

    applyBuff(self: Character, duration: number, quantity: number, name = this.name) {
        if (this.isPermanent) {
            return;
        };

        this.state = true;
        // this.name = name;
        this.duration = duration;
        this.quantity = quantity;
        
        self.statistics.speed += Math.round(self.statistics.speed * this.quantity);
    };

    checkBuff(self: Character) {
        if (!this.state) {
            return;
        };

        if (this.duration > 0) {
            this.duration--;
        };

        if (this.duration === 0) {
            this.state = false;
            self.statistics.speed = Math.round(self.statistics.speed / (1 + this.quantity));
            this.name = "High Speed";
            return;
        };
    };
};
import Buff from "../Buff.ts";
import type Character from "../Character.ts";

export default class CounterStrike extends Buff {
    constructor() {
        super({
            name: "Counter Strike",
            state: false,
            isPermanent: false,
            duration: 0,
            quantity: 0
        });
    };

    applyBuff(self: Character, duration: number, quantity: number, name: string) {
        if (this.isPermanent) {
            return;
        };

        this.state = true;
        this.duration = duration;
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
            return;
        };
    };
};
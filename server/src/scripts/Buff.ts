import type { BuffData } from '../types.ts';
import type { CharacterData } from '../types.ts';

export default abstract class Buff {
    name: string;
    state: boolean;
    isPermanent: boolean;
    duration: number;
    quantity: number;

    constructor(buffData: BuffData) {
        this.name = buffData.name;
        this.state = buffData.state;
        this.isPermanent = buffData.isPermanent;
        this.duration = buffData.duration;
        this.quantity = buffData.quantity;
    };

    abstract applyBuff(self: CharacterData, duration: number, quantity: number, name: string): void;
    abstract checkBuff(self: CharacterData): void;
};
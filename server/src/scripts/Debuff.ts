import type { DebuffData } from '../types.ts';
import type { CharacterData } from '../types.ts';

export default abstract class Debuff {
    name: string;
    state: boolean;
    isPermanent: boolean;
    duration: number;
    quantity: number;

    constructor(debuffData: DebuffData) {
        this.name = debuffData.name;
        this.state = debuffData.state;
        this.isPermanent = debuffData.isPermanent;
        this.duration = debuffData.duration;
        this.quantity = debuffData.quantity;
    };

    abstract applyDebuff(self: CharacterData, duration: number, quantity: number): void;
    abstract checkDebuff(self: CharacterData): void;
};
import type { FightingLog, NegativeEffectsData } from "../types.ts";
import type { CharacterData } from '../types.ts';

export default abstract class NegativeEffects {
    name: string;
    state: boolean;
    stacks: number;
    duration: number;
    damage: number;

    constructor(effectsData: NegativeEffectsData) {
        this.name = effectsData.name;
        this.state = effectsData.state;
        this.stacks = effectsData.stacks;
        this.duration = effectsData.duration;
        this.damage = effectsData.damage;
    };

    abstract applyNegativeEffect(self: CharacterData): FightingLog;
};
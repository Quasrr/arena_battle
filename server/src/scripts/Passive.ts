import type { CharacterData, PassiveData, FightingLog } from "../types.ts";

export default abstract class Passive {
    name: string;
    display: boolean;
    description: string;
    stacks: number;

    constructor(data: PassiveData) {
        this.name = data.name;
        this.display = data.display;
        this.description = data.description;
        this.stacks = data.stacks
    };

    abstract onTurn(target: CharacterData, self: CharacterData): void;
    abstract onHit(target: CharacterData, self: CharacterData): FightingLog | void;
};
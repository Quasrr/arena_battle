import type { SpellData } from "../types.ts";
import type { CharacterData } from '../types.ts';

export default abstract class Spell {
    name: string;
    image: string;
    description: string;
    castChance: number;
    cooldown: number;
    currentCooldown: number;
    damageType: string;
    type: string;

    constructor(spellData: SpellData) {
        this.name = spellData.name;
        this.image = spellData.image;
        this.description = spellData.description;
        this.castChance = spellData.castChance;
        this.cooldown = spellData.cooldown;
        this.currentCooldown = spellData.currentCooldown;
        this.damageType = spellData.damageType;
        this.type = spellData.type;
    };

    abstract canUseSpell(caster: CharacterData): boolean;
    abstract useSpell(target: CharacterData, self: CharacterData): void;
}
import type { CharacterData, Statistics, DamageLog } from "../types.ts";
import type Buff from "./Buff.ts";
import type Debuff from "./Debuff.ts";
import type NegativeEffects from "./NegativeEffects.ts";
import type Passive from "./Passive.ts";
import type Spell from "./Spell.ts";

export default abstract class Character {
    name: string;
    className: string;
    typeName: string;
    image: string;
    description: string;
    avatar: string;
    statistics: Statistics;
    baseStatistics: Statistics;
    passives: Array<Passive>;
    buffs: Array<Buff>;
    debuffs: Array<Debuff>;
    negativeEffects: Array<NegativeEffects>;
    spells: Array<Spell>;

    constructor(data: CharacterData) {
        this.name = data.name;
        this.className = data.className;
        this.typeName = data.typeName; // Résistances à l'avenir ?
        this.image = data.image;
        this.description = data.description;
        this.avatar = data.avatar;
        this.statistics = data.statistics;
        this.baseStatistics = data.baseStatistics;
        this.passives = data.passives;
        this.buffs = data.buffs;
        this.debuffs = data.debuffs;
        this.negativeEffects = data.negativeEffects;
        this.spells = data.spells;
    };
    
    abstract perTurn(target: Character, self: Character): void;
    abstract perHit(target: CharacterData, self: CharacterData, damage: number): DamageLog;
};
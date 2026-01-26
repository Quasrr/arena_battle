import type { Request } from "express";
import type Character from "./scripts/Character.ts";
import type Buff from "./scripts/Buff.ts";
import type Debuff from "./scripts/Debuff.ts";
import type NegativeEffects from "./scripts/NegativeEffects.ts";
import type Passive from "./scripts/Passive.ts";
import type Spell from "./scripts/Spell.ts";

export type RequestAuth = Request  & {
    username?: string;
};

export type JWTPayload = {
    username: string;
    iat: number;
    exp: number;
};

export type Statistics = {
    hp: number;
    str: number;
    arm: number;
    speed: number;
    critChance: number;
    critDamage: number;
};

export type BuffData = Pick<Buff, "name" | "state" | "isPermanent" | "duration" | "quantity">;

export type DebuffData = Pick<Debuff, "name" | "state" | "isPermanent" | "duration" | "quantity">;

export type NegativeEffectsData = Pick<NegativeEffects, "name" | "state" | "stacks" | "duration" | "damage">;

export type PassiveData = Pick<Passive, "name" | "display" | "description" | "stacks">;

export type SpellData = Pick<Spell, 
    "name" | "image" | "description" | "castChance" | "cooldown" |
    "currentCooldown" | "damageType" | "type">;

export type CharacterData = Pick<Character, 
    "name" | "className" | "typeName" | "image" | "description" | "avatar" |
    "statistics" | "baseStatistics" | "passives" | "buffs" | "debuffs" |
    "negativeEffects" | "spells"
>;

export type StyleLog = {
    word: string;
    color: string;
};

export type FightingLog = {
    text: string;
    styles: Array<StyleLog>;
};

export type DamageLog = {
    damage: number;
    log: Array<FightingLog>;
};

export type BattleSchema = {
    dataValues: {
        battleId: string;
        state: string;
        turn: number;
        data: string;
    };
};

export type BattleData = {
    player: Character;
    enemy: Character;
};
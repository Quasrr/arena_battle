import Character from "../Character.ts";

// import des types du personnage
import type { FightingLog, DamageLog } from "../../types.ts";

// import des debuffs du personnage
import LowArmor from "../debuffs/LowArmor.ts";
import LowSpeed from "../debuffs/LowSpeed.ts";
import LowStrength from "../debuffs/LowStrength.ts";

// import des sorts du personnage
import ProfaneRake from "../spells/ProfaneRake.ts";
import SanguineBite from "../spells/SanguineBite.ts";
import sanguineOffering from "../spells/SanguineOffering.ts";
import Exsanguinate from "../spells/Exsanguinate.ts";

// import des états négatifs du personnage
import Bleed from "../negativesEffects/Bleed.ts";
import Burn from "../negativesEffects/Burn.ts";
import Freeze from "../negativesEffects/Freeze.ts";
import Poison from "../negativesEffects/Poison.ts";
import Slow from "../negativesEffects/Slow.ts";
import Stun from "../negativesEffects/Stun.ts";

export default class Baron extends Character {
    constructor(name: string) {
        super({
            name: name,
            className: "Baron",
            typeName: "Monster",
            image: "/images/characters/monsters/boss/baron/baron.png",
            description: "Baron is a strong boss using powerfull strikes and bleedings",
            avatar: "/images/characters/monsters/boss/baron/avatars/baron_avatar.png",
            statistics: {
                hp: 4500,
                str: 240,
                arm: 50,
                speed: 30,
                critChance: 0.2,
                critDamage: 1.5
            },
            baseStatistics: {
                hp: 4500,
                str: 240,
                arm: 50,
                speed: 30,
                critChance: 0.2,
                critDamage: 1.5
            },
            passives: [],
            buffs: [],
            debuffs: [new LowArmor(), new LowSpeed(), new LowStrength()],
            negativeEffects: [new Bleed(), new Burn(), new Freeze(), new Poison(), new Slow(), new Stun()],
            spells: [new ProfaneRake(), new SanguineBite(), new sanguineOffering(), new Exsanguinate()],
        });
    };

    perTurn(target: Character, self: Character) {
        this.passives.forEach(passive => {
            passive.onTurn(target, self);
        })
    }

    perHit(target: Character, self: Character, damage: number): DamageLog {
        const log: Array<FightingLog> = [];

        this.statistics.hp -= damage;

        this.passives.forEach(passive => {
            let p = passive?.onHit(target, self);
            
            if (p) {
                log.push(p);
            }
        })

        return { damage, log };
    }
};
import Character from "../Character.ts";

// import des types du personnage
import type { FightingLog, DamageLog } from "../../types.ts";

// import des passifs du personnage
import RiftChargePassive from "../passives/RiftChargePassive.ts";

//import des buffs du personnage
import HighSpeed from "../buffs/HighSpeed.ts";

//import des debuffs du personnage
import LowArmor from "../debuffs/LowArmor.ts";
import LowSpeed from "../debuffs/LowSpeed.ts";
import LowStrength from "../debuffs/LowStrength.ts";

// import des sorts du personnage
import SpatialShear from "../spells/SpatialShear.ts";
import RiftTalon from "../spells/RiftTalon.ts";
import VoidstepAssault from "../spells/VoidstepAssault.ts";

// import des états négatifs du personnage
import Bleed from "../negativesEffects/Bleed.ts";
import Burn from "../negativesEffects/Burn.ts";
import Freeze from "../negativesEffects/Freeze.ts";
import Poison from "../negativesEffects/Poison.ts";
import Slow from "../negativesEffects/Slow.ts";
import Stun from "../negativesEffects/Stun.ts";

export default class DimensionalDevourer extends Character {
    constructor(name: string) {
        super({
            name: name,
            className: "Dimensional Devourer",
            typeName: "Monster",
            image: "/images/characters/monsters/boss/dimensional_devourer/dimensional_devourer.png",
            description: "An apex aberration that tears reality, steals tempo, and banishes targets between dimensions. Its powers weaken when Anchored.",
            avatar: "/images/characters/monsters/boss/dimensional_devourer/avatars/dimensional_devourer.png",
            statistics: {
                hp: 2400,
                str: 220,
                arm: 85,
                speed: 62,
                critChance: 0.1,
                critDamage: 1.8
            },
            baseStatistics: {
                hp: 2400,
                str: 220,
                arm: 85,
                speed: 62,
                critChance: 0.1,
                critDamage: 1.8
            },
            passives: [new RiftChargePassive()],
            buffs: [new HighSpeed()],
            debuffs: [new LowArmor(), new LowSpeed(), new LowStrength()],
            negativeEffects: [new Bleed(), new Burn(), new Freeze(), new Poison(), new Slow(), new Stun()],
            spells: [new SpatialShear(), new RiftTalon(), new VoidstepAssault()],
        });
    };

    perTurn(target: Character, self: Character) {
        this.passives.forEach(passive => {
            passive.onTurn(target, self);
        });
    };

    perHit(target: Character, self: Character, damage: number): DamageLog {
        const log: Array<FightingLog> = [];

        const rift = this.passives.find(element => element.name === 'Rift Charge');

        if (rift) {
            const stacks = rift.stacks >= 80 ? 80 : rift.stacks;

            damage = Math.round(damage - ((damage * stacks) / 100));
        };
        
        this.statistics.hp -= damage;

        this.passives.forEach(passive => {
            let p = passive.onHit(target, self);
            
            if (p) {
                log.push(p);
            };
        });

        return { damage, log };
    };
};
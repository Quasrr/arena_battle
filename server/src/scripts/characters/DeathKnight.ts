import Character from "../Character.ts";

// import des types du personnage
import type { FightingLog, DamageLog } from "../../types.ts";

//import des buffs du personnages
import CounterStrike from "../buffs/CounterStrike.ts";
import HighSpeed from "../buffs/HighSpeed.ts";

//import des debuffs du personnage
import LowArmor from "../debuffs/LowArmor.ts";
import LowSpeed from "../debuffs/LowSpeed.ts";
import LowStrength from "../debuffs/LowStrength.ts";

//import des passifs du personnage
import CounterStrikePassive from "../passives/CounterStrikePassive.ts";
import SoulsScalingPassive from "../passives/SoulsScalingPassive.ts";

//import des sorts du personnage
import Overpower from "../spells/Overpower.ts";
import PhantomBacklash from "../spells/PhantomBacklash.ts";
import PiercingStrike from "../spells/PiercingStrike.ts";
import SoulHarvest from "../spells/SoulHarvest.ts";
import SpectralStrike from "../spells/SpectralStrike.ts";

//import des états négatifs du personnage
import Bleed from "../negativesEffects/Bleed.ts";
import Burn from "../negativesEffects/Burn.ts";
import Freeze from "../negativesEffects/Freeze.ts";
import Poison from "../negativesEffects/Poison.ts";
import Slow from "../negativesEffects/Slow.ts";
import Stun from "../negativesEffects/Stun.ts";

export default class DeathKnight extends Character {
    constructor(name: string) {
        super({
            name: name,
            className: "DeathKnight",
            typeName: "Human",
            image: "/images/characters/humans/classes/death_knight/death_knight1.png",
            avatar: "/images/characters/humans/classes/death_knight/avatars/deathknight_avatar.png",
            description: "Deathknight is a powerfull class using stats scaling based on collected souls",
            statistics: {
                hp: 800,
                str: 150,
                arm: 60,
                speed: 50,
                critChance: 0.2,
                critDamage: 1.5
            },
            baseStatistics: {
                hp: 800,
                str: 150,
                arm: 60,
                speed: 50,
                critChance: 0.2,
                critDamage: 1.5
            },
            passives: [new SoulsScalingPassive(), new CounterStrikePassive()],
            buffs: [new CounterStrike(), new HighSpeed()],
            debuffs: [new LowArmor(), new LowSpeed(), new LowStrength()],
            negativeEffects: [new Bleed(), new Burn(), new Freeze(), new Poison(), new Slow(), new Stun()],
            spells: [
                new PiercingStrike(),
                new SpectralStrike(),
                new PhantomBacklash(),
                new Overpower(),
                new SoulHarvest(),
            ],
        });
    };

    perTurn(target: Character, self: Character) {
        this.passives.forEach(passive => {
            passive.onTurn(target, self);
        });
    };

    perHit(target: Character, self: Character, damage: number): DamageLog {
        const log: Array<FightingLog> = [];

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
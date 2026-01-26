import type Character from "../Character.ts";
import Spell from "../Spell.ts";
import Fight from "../utils/Fight.ts";

export default class SoulHarvest extends Spell {
    constructor() {
        super({
            name: "Soul Harvest",
            image: "/images/characters/humans/classes/death_knight/spells_icons/soul_harvest.png",
            description: "Steal soul's fragment of the target, dealing damage and healing himself for 10% of this amount",
            castChance: 0.3,
            cooldown: 3,
            currentCooldown: 0,
            damageType: 'magical',
            type: 'enemy'
        });
    };

    canUseSpell(caster: Character) {
        return this.currentCooldown === 0;
    };

    useSpell(target: Character, self: Character) {
        const log = [];

        let damage = Fight.calculateCharacterDamage(self.statistics.str, target.statistics.arm);
        let healing = Math.floor(damage * 0.10);

        if (self.statistics.hp >= self.baseStatistics.hp) {
            healing = 0;
        };

        let soulsPassive = self.passives.find(element => element.name === "Souls");

        if (soulsPassive) {
            soulsPassive.stacks += 5;
        };

        self.statistics.hp += healing;

        const damageEffect = target.perHit(target, self, damage);

        this.currentCooldown = this.cooldown;

        if (damageEffect.damage > 0) {
            const spellLog = {
                text: `${self.name} utilise Soul Harvest, inflige ${damageEffect.damage} points de dégats et se soigne de ${healing} points de vie`,
                styles:
                    [
                        { word: `Soul`, color: 'grey' },
                        { word: `Harvest`, color: 'grey' },
                        { word: `${damageEffect.damage}`, color: 'orange' },
                        { word: `${healing}`, color: 'green' }
                    ]
            };

            log.push(spellLog);
        };

        if (damageEffect.log) {
            damageEffect.log.forEach(element => log.push(element));
        };

        return log;
    };
};
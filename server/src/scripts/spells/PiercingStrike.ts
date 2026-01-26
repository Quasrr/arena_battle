import Spell from "../Spell.ts";
import Fight from "../utils/Fight.ts";
import type { CharacterData, DamageLog } from '../../types.ts';
import type Character from "../Character.ts";

export default class PiercingStrike extends Spell {
    constructor() {
        super({
            name: "Piercing Strike",
            image: "/images/characters/humans/classes/death_knight/spells_icons/piercing_strike.png",
            description: "Piercing Strike on the enemy head, dealing 100 dmg",
            castChance: 0.15,
            cooldown: 2,
            currentCooldown: 0,
            damageType: 'physical',
            type: 'enemy',
        });
    };

    canUseSpell(caster: Character) {
        return this.currentCooldown === 0;
    };

    useSpell(target: Character, self: Character) {
        const log = [];

        let soulsPassive = self.passives.find(element => element.name === "Souls");

        if (soulsPassive) {
            soulsPassive.stacks++;
        };

        let damage = Math.round(Fight.calculateCharacterDamage(self.statistics.str, target.statistics.arm) * 1.2);
        
        const damageEffect: DamageLog = target.perHit(target, self, damage);

        this.currentCooldown = this.cooldown;

        if (damageEffect.damage > 0) {
            let spellLog = {
                text: `${self.name} utilise ${this.name} et inflige ${damageEffect.damage} points de dégats à ${target.name}`,
                styles:
                    [
                        { word: `Piercing`, color: 'grey' },
                        { word: `Strike`, color: 'grey' },
                        { word: `${damageEffect.damage}`, color: 'yellow' }
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
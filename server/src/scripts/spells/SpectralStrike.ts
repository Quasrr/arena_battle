import type Character from "../Character.ts";
import Spell from "../Spell.ts";
import Fight from "../utils/Fight.ts";

export default class SpectralStrike extends Spell {
    constructor() {
        super({
            name: "Spectral Strike",
            image: "/images/characters/humans/classes/death_knight/spells_icons/spectral_strike.png",
            description: "Dealing some DMG + 25% missing health of the target",
            castChance: 0.15,
            cooldown: 5,
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

        let targetHP = target.baseStatistics.hp - target.statistics.hp;
        let percentMissingHealthDamage = Math.round(targetHP * 0.25);

        let damage = Math.round(Fight.calculateCharacterDamage(self.statistics.str, target.statistics.arm) / 2 + percentMissingHealthDamage);
        
        const damageEffect = target.perHit(target, self, damage);

        this.currentCooldown = this.cooldown;
        
        if (damageEffect.damage > 0) {
            let spellLog = {
                text: `${self.name} utilise ${this.name} et inflige ${damageEffect.damage} points de dégats à ${target.name}`,
                styles:
                    [
                        { word: `Spectral`, color: 'grey' },
                        { word: `Strike`, color: 'grey' },
                        { word: `${damageEffect.damage}`, color: 'grey' }
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
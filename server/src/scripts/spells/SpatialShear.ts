import type Character from "../Character.ts";
import Spell from "../Spell.ts";
import Fight from "../utils/Fight.ts";

export default class SpatialShear extends Spell {
    constructor() {
        super({
            name: "Spatial Shear",
            image: "/images/characters/monsters/boss/dimensional_devourer/spells_icon/spatial_shear.png",
            description: "Ignore 33% of the target armor, deal damage to the target and grant rift stacks",
            castChance: 0.3,
            cooldown: 2,
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

        let damage = Fight.calculateCharacterDamage(self.statistics.str, target.statistics.arm * 0.66);
        target.debuffs[0]?.applyDebuff(target, 3, 5);

        let riftPassive = self.passives.find(element => element.name === "Rift Charge");

        if (riftPassive) {
            riftPassive.stacks += 1;
        };

        const damageEffect = target.perHit(target, self, damage);

        this.currentCooldown = this.cooldown;

        if (damageEffect.damage > 0) {
            const spellLog = {
                text: `${self.name} utilise Spatial Shear et inflige ${damageEffect.damage} points de dégats`,
                styles:
                    [
                        { word: `Spatial`, color: 'purple' },
                        { word: `Shear`, color: 'purple' },
                        { word: `${damageEffect.damage}`, color: 'purple' }
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
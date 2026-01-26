import type Character from "../Character.ts";
import Spell from "../Spell.ts";
import Fight from "../utils/Fight.ts";

export default class RiftTalon extends Spell {
    constructor() {
        super({
            name: "Rift Talon",
            image: "/images/characters/monsters/boss/dimensional_devourer/spells_icon/rift_talon.png",
            description: "Deal more damage based on difference of speed with his opponent",
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

        const targetSpeed = target.statistics.speed;
        const selfSpeed = self.statistics.speed;

        let damage = (Fight.calculateCharacterDamage(self.statistics.str, target.statistics.arm) + (selfSpeed - targetSpeed));

        let riftPassive = self.passives.find(element => element.name === "Rift Charge");

        if (riftPassive) {
            riftPassive.stacks += 1;
        };

        const damageEffect = target.perHit(target, self, damage);

        this.currentCooldown = this.cooldown;

        if (damageEffect.damage > 0) {
            const spellLog = {
                text: `${self.name} utilise Rift Talon et inflige ${damageEffect.damage} points de dégats`,
                styles:
                    [
                        { word: `Rift`, color: 'purple' },
                        { word: `Talon`, color: 'purple' },
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
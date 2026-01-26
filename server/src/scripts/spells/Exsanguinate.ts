import Spell from "../Spell.ts";
import type Character from "../Character.ts";

export default class Exsanguinate extends Spell {
    constructor() {
        super({
            name: "Exsanguinate",
            image: "/images/characters/monsters/boss/baron/spells_icon/exsanguinate.png",
            description: "10% missing health healing, apply 10 dmg per turn bleeding on the caster, stackable. 10 turn duration",
            castChance: 0.3,
            cooldown: 6,
            currentCooldown: 0,
            damageType: 'physical',
            type: 'self',
        });
    };

    canUseSpell(caster: Character) {
        return (
            this.currentCooldown === 0 && caster.statistics.hp >= caster.baseStatistics.hp
        );
    };

    useSpell(target: Character, self: Character) {
        const log = [];

        let healing = Math.round((self.baseStatistics.hp - self.statistics.hp) * 0.1);

        self.statistics.hp += healing;

        this.currentCooldown = this.cooldown;

        const spellLog =  {
            text: `${self.name} utilise Exsanguinate et se soigne de ${healing} points de vie!, ${self.name} saigne!`,
            styles:
                [
                    { word: `Exsanguinate`, color: 'red' },
                    { word: `soigne`, color: 'red' },
                    { word: `${healing}`, color: 'green' },
                    { word: `saigne!`, color: 'red' }
                ]
        };

        log.push(spellLog);

        return log;
    };
};
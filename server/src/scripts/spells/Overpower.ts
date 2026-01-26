import Spell from "../Spell.ts";
import type Character from "../Character.ts";

export default class Overpower extends Spell {
    constructor() {
        super({
            name: "Overpower",
            image: "/images/characters/humans/classes/death_knight/spells_icons/overpower.png",
            description: "+30% bonus speed and +30% bonus attack damage",
            castChance: 0.4,
            cooldown: 6,
            currentCooldown: 0,
            damageType: 'none',
            type: 'self'
        });
    };

    canUseSpell(caster: Character): boolean {
        // const overpower = caster.buffs.find(element => {
        //     return element.name === "High Speed";
        // });

        // if (!overpower) return false;

        return this.currentCooldown === 0;
    };

    useSpell(target: Character, self: Character) {
        const log = [];

        let damage = 0;
        this.currentCooldown = this.cooldown;

         const overpower = self.buffs.find(element => {
            return element.name === "High Speed";
        });

        overpower?.applyBuff(self, 5, 0.3, 'Overpower');

        const spellLog = {
            text: `${self.name} utilise Overpower et s'octroie un bonus de vitesse et de dégats supplémentaire de 30%`,
            styles:
                [
                    { word: `Overpower`, color: 'grey' },
                    { word: `vitesse`, color: 'grey' },
                    { word: `dégats`, color: 'grey' },
                    { word: `30%`, color: 'green' }
                ]
        };

        log.push(spellLog);

        return log;
    };
};
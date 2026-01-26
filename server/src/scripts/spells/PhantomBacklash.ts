import type Character from "../Character.ts";
import Spell from "../Spell.ts";

export default class PhantomBacklash extends Spell {
    constructor() {
        super({
            name: "Phantom Backlash",
            image: "/images/characters/humans/classes/death_knight/spells_icons/phantom_backlash.png",
            description: "Activate counterattack for 2 turns. Counterattack dealing -50% attack damage. Can't fail.",
            castChance: 0.3,
            cooldown: 4,
            currentCooldown: 0,
            damageType: 'physical',
            type: 'self'
        });
    };

    canUseSpell(caster: Character) {
        // const counterStrike = caster.buffs.find(element => {
        //     return element.name === "Counter Strike";
        // });

        return (
            this.currentCooldown === 0
        );
    };

    useSpell(target: Character, self: Character) {
        const log = [];

        let damage = 0;
        this.currentCooldown = this.cooldown;
        
        const counterStrike = self.buffs.find(element => {
            return element.name === "Counter Strike";
        });

        counterStrike?.applyBuff(self, 3, 0, 'Counter Strike');

        let spellLog = {
            text: `${self.name} utilise Phantom Backlash et se prépare à riposter pendant 2 tours`,
            styles:
                [
                    { word: `Phantom`, color: 'grey' },
                    { word: `Backlash`, color: 'grey' },
                    { word: `riposter`, color: 'orange' },
                    { word: `2`, color: 'green' }
                ]
        };

        log.push(spellLog);

        return log;
    };
};
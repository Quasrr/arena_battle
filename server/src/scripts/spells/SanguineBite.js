import Spell from "../Spell.js";

class SanguineBite extends Spell {
    constructor() {
        const spellData = {
            name: "Sanguine Bite",
            image: "/images/characters/monsters/boss/baron/spells_icon/sanguine_bite.png",
            description: "Bite the target, 10 dmg, apply bleeding, 5 dmg per turn, stackable. 3 turn duration",
            castChance: 0.3,
            cooldown: 2,
            currentCooldown: 0,
            damageType: 'physical',
            type: 'enemy',
        };

        super(spellData);
    }

    canUseSpell(caster) {
        return this.currentCooldown === 0;
    }

    useSpell(target, self, battle) {
        let damage = Math.round(battle.fight.calculateCharacterDamage(self.statistics.STR, target.statistics.ARM) / 4);

        const targetBleedState = target.negativeEffects.find(negate => {
            return negate.name === 'Bleed';
        })

        if (!targetBleedState) return;

        targetBleedState.state = true;
        targetBleedState.duration = 3;
        targetBleedState.damage += 4;

        target.statistics.HP -= damage;

        this.currentCooldown = this.cooldown;

        return {
            text: `${self.name} utilise Sanguine Bite et mord ${target.name}, inflige ${damage} et applique un saignement!`,
            styles:
                [
                    { word: `Sanguine`, color: 'red' },
                    { word: `Bite`, color: 'red' },
                    { word: `${damage}`, color: 'red' },
                    { word: `saignement`, color: 'red' }
                ]
        }
    }
}

export default SanguineBite;
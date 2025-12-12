import Spell from "../Spell.js";

class SoulHarvest extends Spell {
    constructor() {
        const spellData = {
            name: "Soul Harvest",
            image: "./src/assets/art/characters/humans/classes/death_knight/spells_icons/soul_harvest.png",
            description: "Steal soul's fragment of the target, dealing damage and healing himself for 10% of this amount",
            castChance: 0.3,
            cooldown: 3,
            currentCooldown: 0,
            damageType: 'magical',
            type: 'enemy'
        };

        super(spellData);
    }

    canUseSpell(caster) {
        return this.currentCooldown === 0;
    }

    useSpell(target, self, battle) {
        let damage = battle.fight.calculateCharacterDamage(self.statistics.STR, target.statistics.ARM);
        let healing = Math.floor(damage * 0.10);
        if (self.statistics.HP >= self.statistics.maxHP) {
            healing = 0;
        }

        self.selfAttributes.Souls += 5;
        self.statistics.HP += healing

        target.statistics.HP -= damage;

        this.currentCooldown = this.cooldown;

        return {
            text: `${self.name} utilise Soul Harvest, inflige ${damage} points de dégats et se soigne de ${healing} points de vie`,
            styles:
                [
                    { word: `Soul`, color: 'grey' },
                    { word: `Harvest`, color: 'grey' },
                    { word: `${damage}`, color: 'orange' },
                    { word: `${healing}`, color: 'green' }
                ]
        }
    }
}

export default SoulHarvest;
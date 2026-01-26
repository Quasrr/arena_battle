import Utilities from "./Utilities.ts";

// import des personnages
import DeathKnight from "../characters/DeathKnight.ts";
import Baron from "../characters/Baron.ts";
import DimensionalDevourer from "../characters/DimensionalDevourer.ts";

// import des types
import type { CharacterData } from "../../types.ts";
import type Character from "../Character.ts";
import type Spell from "../Spell.ts";
import type NegativeEffects from "../NegativeEffects.ts";

class Fight {

    static calculateCharacterHitChance(speed: number): number {
        return Math.floor(Math.random() * speed);
    }

    static chooseCharacterHitTurn(playerChance: number, enemyChance: number): boolean {
        return playerChance > enemyChance; 
    }

    static calculateCharacterCriticalChance(criticalChance: number): boolean {
        return Math.random() < criticalChance;
    }

    static calculateCharacterDamage(STR: number, ARM: number): number {
        return Math.floor((STR * (100 / (100 + ARM))) + Math.random() * (STR / 10));
    }

    static reduceCharacterSpellsCooldown(spells: Array<Spell>) {
        spells.forEach(spell => {
            if (spell.currentCooldown > 0) {
                spell.currentCooldown--;
            }
        })
    }

    // méthode static qui créer les personnages à la volée et hydratation de ceci pour permettre
    // l'utilisation des méthodes d'instance de leur classe respective
    static createCharacter(char: CharacterData) {
        let character: Character | null = null;

        switch(char.className) {
            case "DeathKnight":
                character = new DeathKnight(char.name);
                break;
            case "Baron":
                character = new Baron(char.name);
                break;
            case "Dimensional Devourer":
                character = new DimensionalDevourer(char.name);
                break;
        }

        if (!character) return;

        character.statistics = char.statistics;
        character.baseStatistics = char.baseStatistics;

        if (character.passives.length) {
            character.passives.forEach(passive => {
                const charPassive = char.passives.find(element => element.name === passive.name);

                if (!charPassive) return;

                passive.display = charPassive.display;
                passive.stacks = charPassive.stacks;
            })
        }

        if (character.buffs.length) {
            character.buffs.forEach(buff => {
                const charBuff = char.buffs.find(element => element.name === buff.name);
                
                if (!charBuff) return;

                buff.state = charBuff.state;
                buff.isPermanent = charBuff.isPermanent;
                buff.duration = charBuff.duration;
                buff.quantity = charBuff.quantity;
            })
        }

        if (character.debuffs.length) {
            character.debuffs.forEach(debuff => {
                const charDebuff = char.debuffs.find(element => element.name === debuff.name);

                if (!charDebuff) return;
                
                debuff.state = charDebuff.state;
                debuff.isPermanent = charDebuff.isPermanent;
                debuff.duration = charDebuff.duration;
                debuff.quantity = charDebuff.quantity
            })
        }

        if (character.negativeEffects.length) {
            character.negativeEffects.forEach(negate => {
                const charNegate = char.negativeEffects.find(element => element.name === negate.name);

                if (!charNegate) return;

                negate.state = charNegate.state;
                negate.stacks = charNegate.stacks;
                negate.duration = charNegate.duration;
                negate.damage = charNegate.damage;
            })
        }

        if (character.spells.length) {
            character.spells.forEach(spell => {
                const charSpell = char.spells.find(element => element.name === spell.name);

                if (!charSpell) return;

                spell.castChance = charSpell.castChance;
                spell.cooldown = charSpell.cooldown;
                spell.currentCooldown = charSpell.currentCooldown;
            });
        }

        return character;
    }

    static reduceCharacterNegativeEffectDuration(negate: NegativeEffects) { 
        if (!negate) return;

        negate.duration -= 1;

        if (negate.duration <= 0) {
            negate.state = false;
            negate.stacks = 0;
            negate.damage = 0;
            return;
        }
    }

    static checkCharacterNegativeEffectStates(self: Character) {
        let canPlay = true;

        const stunNegate = self.negativeEffects.find(element => {
            return element.name === 'Stun';
        })

        if (!stunNegate) return;

        if (stunNegate.state) {
            canPlay = false;
        }

        self.negativeEffects.forEach(negate => {
            if (negate.state && negate.duration >= 0) {
                negate.applyNegativeEffect(self);
                this.reduceCharacterNegativeEffectDuration(negate);
            }
        })

        return canPlay;
    }

    static refreshCharacterBuff(self: Character) {
        self.buffs.forEach(buff => {
            buff.checkBuff(self);
        })
    }

    static actionToDo(actionName: string, selfTarget: Character, target: Character) {
        if (!actionName) return;

        selfTarget.spells.forEach(spell => {
            if (actionName === spell.name) {
                spell.useSpell(target, selfTarget)
            }
        })
    }

    static randomAction(user: Character, target: Character) {
        const availableSpells = user.spells.filter(spell => {
            
            if (spell.currentCooldown > 0) return false;

            if (typeof spell.canUseSpell === "function") {
                return spell.canUseSpell(user);
            }

            return true;
        });

        if (availableSpells.length === 0) {
            return null; 
        }

        const randomIndex = Utilities.getRandomInt(availableSpells.length);

        return availableSpells[randomIndex]?.name;
    }
}

export default Fight;
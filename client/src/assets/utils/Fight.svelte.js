import Utilities from "./Utilities.svelte.js";

class Fight {
    fightingLogs = $state([]);

    constructor(name) {
        this.fightName = name;
    }
    
    addLogsLine(obj) {
        this.fightingLogs.push(obj);
    }

    buildLogsText(line) {
        const parts = line.text.split(/(\s+)/);

        return parts.map((part) => {
            const clean = part.replace(/[.,!?;:()"']/g, '');

            const style = line.styles.find(v => v.word === clean);
            return {
                text: part,
                style: style ? `color: ${style.color}; font-weight: bold` : ''
            }
        })
    }

    calculateCharacterCriticalChance(criticalChance) {
        return Math.random() < criticalChance;
    }

    calculateCharacterDamage(STR, ARM) {
        return Math.floor((STR * (100 / (100 + ARM))) + Math.random() * (STR / 10));
    }

    async reduceCharactersSpellsCooldown(battleId, name) {
        let obj = { id: battleId, name}
        const res = await fetch('/api/battle/reduce-character-spells-cd', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj),
        });

        const char = await res.json();

        return char;
    }

    reduceCharacterNegativeEffectDuration(negate) { 
        if (!negate) return;

        negate.duration -= 1;

        if (negate.duration <= 0) {
            negate.state = false;
            negate.stacks = 0;
            negate.damage = 0;
            return;
        }
    }

    async checkCharacterNegativeEffectStates(battleId, name) {
        const res = await fetch('/api/battle/check-character-negative-effect', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: battleId, name}),
        });

        const test = await res.json();
        console.log(test);
        // let canPlay = true;

        // const stunNegate = self.negativeEffects.find(element => {
        //     return element.name === 'Stun';
        // })

        // if (stunNegate.state) {
        //     canPlay = false;
        // }

        // self.negativeEffects.forEach(negate => {
        //     if (negate.state && negate.duration >= 0) {
        //         negate.applyNegativeEffect(self, fightInstance);
        //         this.reduceCharacterNegativeEffectDuration(negate);
        //     }
        // })

        // return canPlay;
    }

    refreshCharacterBuff(target, self) {
        self.buffs.forEach(buff => {
            buff.checkBuff(target, self);
        })
    }

    actionToDo(actionName, selfTarget, target, fightInstance) {
        if (!actionName) return;

        selfTarget.spells.forEach(spell => {
            if (actionName === spell.name) {
                spell.useSpell(target, selfTarget, fightInstance)
            }
        })
    }

    randomAction(user, target) {
        const availableSpells = user.spells.filter(spell => {
            
            if (spell.currentCooldown > 0) return false;

            if (typeof spell.canUseSpell === "function") {
                return spell.canUseSpell(user, target);
            }

            return true;
        });

        if (availableSpells.length === 0) {
            return null; 
        }

        const randomIndex = Utilities.getRandomInt(availableSpells.length);

        return availableSpells[randomIndex].name;
    }
}

export default Fight;
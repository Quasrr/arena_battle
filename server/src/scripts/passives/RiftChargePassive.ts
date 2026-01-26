import type Character from "../Character.ts";
import Passive from "../Passive.ts";

class RiftChargePassive extends Passive {
    constructor() {
        super({
            name: 'Rift Charge',
            display: true,
            description: "Reduce damage taken by %",
            stacks: 1
        });
    };

    onTurn(target: Character, self: Character) {} // méthode appelée au début du tour du personnage, gère les passifs du personnage

    onHit(target: Character, self: Character) {} // méthode appelée dès que le personnage prends un coups, gère les réactions à ce dernier
}

export default RiftChargePassive;
import Passive from "../Passive.js";

class RiftChargePassive extends Passive {
    constructor() {
        const data = {
            name: 'Rift Charge',
            display: true,
            description: "Reduce damage taken by %",
            stacks: 1
        }

        super(data);
    }

    onTurn(target, self) {} // méthode appelée au début du tour du personnage, gère les passifs du personnage

    onHit(target, self) {} // méthode appelée dès que le personnage prends un coups, gère les réactions à ce dernier
}

export default RiftChargePassive;
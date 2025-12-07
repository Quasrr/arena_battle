class NegativeEffects {
    constructor(effectsData) {
        this.name = effectsData.name;
        this.state = $state(effectsData.state);
        this.stacks = $state(effectsData.stacks);
        this.duration = $state(effectsData.duration);
        this.damage = $state(effectsData.damage);
    }
}

export default NegativeEffects;
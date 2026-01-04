class Debuff {
    constructor(debuffData) {
        this.name = debuffData.name;
        this.state = debuffData.state;
        this.isActive = debuffData.isActive;
        this.isPermanent = debuffData.isPermanent;
        this.duration = debuffData.duration;
    }
}

export default Debuff;
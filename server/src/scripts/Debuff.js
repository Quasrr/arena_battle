class Debuff {
    constructor(debuffData) {
        this.name = debuffData.name;
        this.state = debuffData.state;
        this.isPermanent = debuffData.isPermanent;
        this.duration = debuffData.duration;
        this.quantity = debuffData.quantity;
    }
}

export default Debuff;
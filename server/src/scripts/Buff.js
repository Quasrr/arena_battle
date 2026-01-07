class Buff {
    constructor(buffData) {
        this.name = buffData.name;
        this.state = buffData.state;
        this.isActive = buffData.isActive;
        this.isPermanent = buffData.isPermanent;
        this.duration = buffData.duration;
        this.quantity = buffData.quantity;
    }
}

export default Buff;
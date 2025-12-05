class Game {
    logs = $state([]);

    constructor(state) {
        this.state = $state(state);
    }

    addLine(obj) {
        this.logs.push(obj);
    }
}

export default new Game('fight');
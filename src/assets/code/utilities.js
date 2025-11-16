export const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export function choseRandomMonster(object) {
    let monsterList = [];

    for (let key in object) {
        let objects = object[key];
        monsterList.push(objects)
    }

    const randomIndex = Math.floor(Math.random() * monsterList.length);
    const randomMonster = monsterList[randomIndex];

    return randomMonster;
}

export function choseRandomHero(object) {
    let heroList = [];

    for (let key in object) {
        let objects = object[key];
        heroList.push(objects)
    }

    const randomIndex = Math.floor(Math.random() * heroList.length);
    const randomHero = heroList[randomIndex];

    return randomHero;
}

export function buildText(line) {
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
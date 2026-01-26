import BattleStore from '../scripts/BattleStore.ts';

// import des personnages
import DeathKnight from '../scripts/characters/DeathKnight.ts';
import Baron from '../scripts/characters/Baron.ts';
import DimensionalDevourer from '../scripts/characters/DimensionalDevourer.ts';

// import des types
import type { Request, Response } from 'express';

class SelectionController {

    initialiseCharacters(_req: Request, res: Response) {
        const characters = [
            new DeathKnight("DeathKnight"),
            new Baron("Baron"),
            new DimensionalDevourer("Dimensional Devourer")
        ];

        return res.status(200).json(characters);
    };

    // méthode d'instance qui créer un combat en utilisant BattleStore
    async createBattle(req: Request, res: Response) {
        const { userId, playerClass, playerName, enemyClass, enemyName } = req.body;

        let playerCharacter;
        let enemyCharacter;

        switch(playerClass) {
            case "DeathKnight":
                playerCharacter = new DeathKnight(playerName);
                break;
            case "Baron":
                playerCharacter = new Baron(playerName);
                break;
            case "Dimensional Devourer":
                playerCharacter = new DimensionalDevourer(playerName);
                break;
        };

        switch(enemyClass) {
            case "DeathKnight":
                enemyCharacter = new DeathKnight(enemyName);
                break;
            case "Baron":
                enemyCharacter = new Baron(enemyName);
                break;
            case "Dimensional Devourer":
                enemyCharacter = new DimensionalDevourer(enemyName);
                break;
        };

        if (!playerCharacter || !enemyCharacter) {
            return res.status(400).json({ error: "Invalid class" });
        };

        try {
            const battle = await BattleStore.createBattle(userId, playerCharacter, enemyCharacter);
            const { id } = battle;

            res.status(200).json({
                battleId: id,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    };
};

export default new SelectionController();
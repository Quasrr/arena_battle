import BattleStore from '../scripts/BattleStore.ts';

// import des personnages
import DeathKnight from '../scripts/characters/DeathKnight.ts';
import Baron from '../scripts/characters/Baron.ts';
import DimensionalDevourer from '../scripts/characters/DimensionalDevourer.ts';

// import des types
import type { Request, Response } from 'express';
import { BadRequestError } from '../scripts/utils/Error.ts';
import ErrorHandler from '../scripts/ErrorHandler.ts';

class SelectionController {

    initialiseCharacters(_req: Request, res: Response) {
        const characters = [
            new DeathKnight("DeathKnight"),
            new Baron("Baron"),
            new DimensionalDevourer("Dimensional Devourer")
        ];

        return res.send(characters);
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
            throw new BadRequestError("Invalid class");
        };

        try {
            const battle = await BattleStore.createBattle(userId, playerCharacter, enemyCharacter);
            const { id } = battle;

            res.send({ battleId: id });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        };
    };
};

export default new SelectionController();
import { Router } from "express";
import FightController from './controllers/FightController.js';
import SelectionController from "./controllers/SelectionController.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import AuthController from "./controllers/AuthController.js";

const router = Router();

//routes d'authentification
router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/logout', AuthMiddleware.requireAuth, AuthController.logout);
router.get('/api/auth/me', AuthMiddleware.requireAuth, AuthController.me);

//routes de sélection de personnage
router.get('/api/init', AuthMiddleware.requireAuth, SelectionController.initialiseCharacters);
router.post('/api/create-battle', AuthMiddleware.requireAuth, SelectionController.createBattle);

// routes de combat
router.get('/api/battle/:id', AuthMiddleware.requireAuth, FightController.startBattle);
router.get('/api/battle/:id/turn/', AuthMiddleware.requireAuth, FightController.chooseCharacterHitTurn);
router.patch('/api/battle/:id/reduce-character-spells-cd', AuthMiddleware.requireAuth, FightController.reduceCharacterSpellsCooldown);
router.patch('/api/battle/:id/check-character-negative-effect', AuthMiddleware.requireAuth, FightController.checkCharacterNegativeEffectStates);
router.patch('/api/battle/:id/check-character-buffs', AuthMiddleware.requireAuth, FightController.checkCharacterBuffs);
router.patch('/api/battle/:id/check-character-debuffs', AuthMiddleware.requireAuth, FightController.checkCharacterDebuffs);
router.patch('/api/battle/:id/passive-per-turn', AuthMiddleware.requireAuth, FightController.passivePerTurn);
router.get('/api/battle/:id/determine-player-action', AuthMiddleware.requireAuth, FightController.determinePlayerAction);
router.get('/api/battle/:id/determine-enemy-action', AuthMiddleware.requireAuth, FightController.determineEnemyAction);
router.patch('/api/battle/:id/character-use-spell', AuthMiddleware.requireAuth, FightController.characterUseSpell);
router.patch('/api/battle/:id/check-character-alive', AuthMiddleware.requireAuth, FightController.checkCharacterAlive);

export default router;
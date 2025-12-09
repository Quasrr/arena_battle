import { Router } from "express";
import FightController from './controllers/FightController.js';

const router = Router();

router.get('/api/battle/', FightController.initialiseBattle);
router.post('/api/battle/turn/', FightController.chooseCharacterHitTurn);
router.post('/api/battle/reduce-character-spells-cd', FightController.reduceCharacterSpellsCooldown);
router.post('/api/battle/check-character-negative-effect', FightController.reduceCharactersSpellsCooldown);

export default router;
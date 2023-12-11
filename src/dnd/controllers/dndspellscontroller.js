const express = require("express");
const router = express.Router();
const spellService = require("../services/dndspellsservice");
const addWebSocketService = require("../../socket/usewebsocket");
const { deleteKey } = require("../../cache/cache");

router.post("/spells", addWebSocketService, spellService.createNewSpell);
router.get("/spells", spellService.getAllSpells);
router.get("/spells/:id", spellService.getSpellById);
router.put("/spells/:id", addWebSocketService, async (req, res, next) => {
  await deleteKey(`spells:${req.params.id}`);
  spellService.updateSpellById(req, res);
  next();
});
router.delete("/spells/:id", addWebSocketService, async (req, res, next) => {
  await deleteKey(`spells:${req.params.id}`);
  spellService.deleteSpellById(req, res);
  next();
});
router.get("/spells/:name", spellService.getSpellByName);

module.exports = router;

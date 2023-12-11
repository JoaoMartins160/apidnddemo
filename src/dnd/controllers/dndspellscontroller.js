const express = require("express");
const router = express.Router();
const spellService = require("../services/dndspellsservice");
const addWebSocketService = require("../../socket/usewebsocket");
const {deleteKey} = require("../../cache/cache");

router.post("/spells", addWebSocketService, spellService.createNewSpell);
router.get("/spells", spellService.getAllSpells);
router.get("/spells/:id", spellService.getSpellById);
router.put("/spells/:id", addWebSocketService, spellService.updateSpellById, async (req, res) => {
    await deleteKey(`spells:${req.params.id}`);
  });
router.delete("/spells/:id", addWebSocketService, spellService.deleteSpellById, async (req, res) => {
    await deleteKey(`spells:${req.params.id}`);
  });
router.get("/spells/:name", spellService.getSpellByName);

module.exports = router;

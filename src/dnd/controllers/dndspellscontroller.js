const express = require("express");
const router = express.Router();
const spellService = require("../services/dndspellsservice");

router.post("/spells", spellService.createNewSpell);
router.get("/spells", spellService.getAllSpells);
router.get("/spells/:id", spellService.getSpellById);
router.put("/spells/:id", spellService.updateSpellById);
router.delete("/spells/:id", spellService.deleteSpellById);
router.get("/spells/:name", spellService.getSpellByName);

module.exports = router;

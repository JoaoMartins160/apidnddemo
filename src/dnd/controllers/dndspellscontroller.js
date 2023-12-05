const express = require("express");
const router = express.Router();
const spellService = require("../services/dndspellsservice");
const { createClient } = require('redis')
const client = createClient()

router.post("/spells", spellService.createNewSpell);
router.get("/spells", await client.get(spellService.getAllSpells));
router.get("/spells/:id", await client.get(spellService.getSpellById));
router.put("/spells/:id", spellService.updateSpellById);
router.delete("/spells/:id", spellService.deleteSpellById);
router.get("/spells/:name", await client.get(spellService.getSpellByName));

module.exports = router;

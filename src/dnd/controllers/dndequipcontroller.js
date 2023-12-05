const express = require("express");
const router = express.Router();
const equipService = require("../services/dndequipservice");
const { createClient } = require('redis')
const client = createClient()

router.post("/equipment", equipService.createNewEquip);
router.get("/equipment", await client.get(equipService.getAllEquips));
router.get("/equipment/:id", await client.get(equipService.getEquipById));
router.put("/equipment/:id", equipService.updateEquipById);
router.delete("/equipment/:id", equipService.deleteEquipById);
router.get("/equipment/:name", await client.get(equipService.getEquipByName));

module.exports = router;

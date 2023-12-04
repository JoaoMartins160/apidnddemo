const express = require("express");
const router = express.Router();
const equipService = require("../services/dndequipservice");

router.post("/equipment", equipService.createNewEquip);
router.get("/equipment", equipService.getAllEquips);
router.get("/equipment/:id", equipService.getEquipById);
router.put("/equipment/:id", equipService.updateEquipById);
router.delete("/equipment/:id", equipService.deleteEquipById);
router.get("/equipment/:name", equipService.getEquipByName);

module.exports = router;

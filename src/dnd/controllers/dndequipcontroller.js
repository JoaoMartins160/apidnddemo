const express = require("express");
const router = express.Router();
const equipService = require("../services/dndequipservice");
const addWebSocketService = require("../../socket/usewebsocket");
const {deleteKey} = require("../../cache/cache");

router.post("/equipment", addWebSocketService, equipService.createNewEquip);
router.get("/equipment", equipService.getAllEquips);
router.get("/equipment/:id", equipService.getEquipById);
router.put("/equipment/:id", addWebSocketService, equipService.updateEquipById, async (req, res) => {
  await deleteKey(`equipment:${req.params.id}`);
});
router.delete("/equipment/:id",addWebSocketService,equipService.deleteEquipById, async (req, res) => {
  await deleteKey(`equipment:${req.params.id}`);
});
router.get("/equipment/:name", equipService.getEquipByName);

module.exports = router;

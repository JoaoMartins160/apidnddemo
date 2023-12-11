const express = require("express");
const router = express.Router();
const monsterService = require("../services/dndmonsterservice");
const addWebSocketService = require("../../socket/usewebsocket");
const {deleteKey} = require("../../cache/cache");

router.post("/monsters", addWebSocketService, monsterService.createNewMonster);
router.get("/monsters", monsterService.getAllMonsters);
router.get("/monsters/:id", monsterService.getMonsterById);
router.put("/monsters/:id",addWebSocketService,monsterService.updateMonsterById,async (req, res) => {
  await deleteKey(`monster:${req.params.id}`);
});
router.delete("/monsters/:id",addWebSocketService,monsterService.deleteMonsterById, async (req, res) => {
  await deleteKey(`monster:${req.params.id}`);
});
router.get("/monsters/:name", monsterService.getMonsterByName);

module.exports = router;

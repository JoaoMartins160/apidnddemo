const express = require("express");
const router = express.Router();
const monsterService = require("../services/dndmonsterservice");

router.post("/monsters", monsterService.createNewMonster);
router.get("/monsters", monsterService.getAllMonsters);
router.get("/monsters/:id", monsterService.getMonsterById);
router.put("/monsters/:id", monsterService.updateMonsterById);
router.delete("/monsters/:id", monsterService.deleteMonsterById);
router.get("/monsters/:name", monsterService.getMonsterByName);

module.exports = router;

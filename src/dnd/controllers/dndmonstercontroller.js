const express = require("express");
const router = express.Router();
const monsterService = require("../services/dndmonsterservice");
const { createClient } = require('redis')
const client = createClient()

router.post("/monsters", monsterService.createNewMonster);
router.get("/monsters", await client.get(monsterService.getAllMonsters));
router.get("/monsters/:id", await client.get(monsterService.getMonsterById));
router.put("/monsters/:id", monsterService.updateMonsterById);
router.delete("/monsters/:id", monsterService.deleteMonsterById);
router.get("/monsters/:name", await client.get(monsterService.getMonsterByName));

module.exports = router;

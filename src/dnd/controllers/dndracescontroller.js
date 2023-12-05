const express = require("express");
const router = express.Router();
const classService = require("../services/dndracesservice");
const { createClient } = require('redis')
const client = createClient()

router.post("/races", classService.createNewRace);
router.get("/races", await client.get(classService.getAllRaces));
router.get("/races/:id", await client.get(classService.getRaceById));
router.put("/races/:id", classService.updateRaceById);
router.delete("/races/:id", classService.deleteRaceById);
router.get("/races/:name", await client.get(classService.getRaceByName));

module.exports = router;

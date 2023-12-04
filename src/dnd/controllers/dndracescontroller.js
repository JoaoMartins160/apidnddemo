const express = require("express");
const router = express.Router();
const classService = require("../services/dndracesservice");

router.post("/races", classService.createNewRace);
router.get("/races", classService.getAllRaces);
router.get("/races/:id", classService.getRaceById);
router.put("/races/:id", classService.updateRaceById);
router.delete("/races/:id", classService.deleteRaceById);
router.get("/races/:name", classService.getRaceByName);

module.exports = router;

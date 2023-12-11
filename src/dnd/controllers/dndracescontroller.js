const express = require("express");
const router = express.Router();
const classService = require("../services/dndracesservice");
const addWebSocketService = require("../../socket/usewebsocket");
const {deleteKey} = require("../../cache/cache");

router.post("/races", addWebSocketService, classService.createNewRace);
router.get("/races", classService.getAllRaces);
router.get("/races/:id", classService.getRaceById);
router.put("/races/:id", addWebSocketService, classService.updateRaceById, async (req, res) => {
    await deleteKey(`races:${req.params.id}`);
  });
router.delete("/races/:id", addWebSocketService, classService.deleteRaceById, async (req, res) => {
    await deleteKey(`races:${req.params.id}`);
  });
router.get("/races/:name", classService.getRaceByName);

module.exports = router;

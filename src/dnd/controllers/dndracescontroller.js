const express = require("express");
const router = express.Router();
const classService = require("../services/dndclassservice");

router.post("/classes", classService.createNewClass);
router.get("/classes", classService.getAllClasses);
router.get("/classes/:id", classService.getClassById);
router.put("/classes/:id", classService.updateClassById);
router.delete("/classes/:id", classService.deleteClassById);
router.get("/classes/:name", classService.getClassByName);

module.exports = router;

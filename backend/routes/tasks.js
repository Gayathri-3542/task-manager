const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasksController");

// CRUD
router.post("/", controller.createTask); // create
router.get("/", controller.getTasks); // list all (optional ?status=COMPLETED)
router.get("/:id", controller.getTaskById); // single
router.put("/:id", controller.updateTask); // update
router.delete("/:id", controller.deleteTask); // delete

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controller/receptionist.controller");

router.post("/", controller.addReceptionist);
router.get("/", controller.getReceptionists);
router.get("/:id", controller.getReceptionistById);
router.put("/:id", controller.updateReceptionist);
router.delete("/:id", controller.deleteReceptionist);

module.exports = router;


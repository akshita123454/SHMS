const express = require("express");
const router = express.Router();
const controller = require("../controller/receptionist.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");

router.post("/",protect, authorizeRoles('reception'), controller.addReceptionist);
router.get("/",protect, authorizeRoles('reception'), controller.getReceptionists);
router.get("/:id", protect, authorizeRoles('reception'),controller.getReceptionistById);
router.put("/:id", protect, authorizeRoles('reception'),controller.updateReceptionist);
router.delete("/:id",protect, authorizeRoles('reception'), controller.deleteReceptionist);

module.exports = router;

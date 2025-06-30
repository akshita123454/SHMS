// routes/inventory.route.js
import express from "express";
import {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controller/inventory.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protect, authorizeRoles('admin'),  getInventory);
router.post("/",protect, authorizeRoles('admin'),  createInventoryItem);
router.put("/:id", protect, authorizeRoles('admin'), updateInventoryItem);
router.delete("/:id",protect, authorizeRoles('admin'),  deleteInventoryItem);

export default router;

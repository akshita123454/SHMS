// routes/inventory.route.js
import express from "express";
import {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controller/inventory.controller.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/", createInventoryItem);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

export default router;

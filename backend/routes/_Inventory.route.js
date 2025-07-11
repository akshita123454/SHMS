// routes/_Inventory.route.js
import express from "express";
import {
  addInventoryItem,
  getAllInventoryItems,
  getItemsByCategory,
} from "../controller/_Inventory.controller.js";

const router = express.Router();

router.post("/add-item", addInventoryItem);
router.get("/all", getAllInventoryItems);
router.get("/category/:categoryName", getItemsByCategory);

export default router;



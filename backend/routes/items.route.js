// routes/item.routes.js
import express from "express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controller/items.contoller";

const router = express.Router();

// GET all items
router.get("/", getItems);

// GET item by ID
router.get("/:id", getItemById);

// POST new item
router.post("/", createItem);

// PUT update item
router.put("/:id", updateItem);

// DELETE item
router.delete("/:id", deleteItem);

export default router;

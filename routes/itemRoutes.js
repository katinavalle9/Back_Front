import express from "express";
import {
  createItem,
  deleteItemById,
  getAllItems,
  getItemById,
  updateItemById,
} from "../controllers/itemController.js";

const itemRoutes = express.Router();

itemRoutes.post("/", createItem);
itemRoutes.get("/", getAllItems);
itemRoutes.get("/:itemId", getItemById);
itemRoutes.patch("/:itemId", updateItemById);
itemRoutes.delete("/:itemId", deleteItemById);

export default itemRoutes;

import { Router } from "express";
import {
  getHistory,
  getHistoryItem,
  deleteHistoryItem,
  clearHistory,
} from "../controllers/history.controller.js";
import { protect as authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.delete("/clear", clearHistory);
router.get("/", getHistory);
router.get("/:id", getHistoryItem);
router.delete("/:id", deleteHistoryItem);

export default router;

import { Router } from "express";
import {
  listStories,
  getStory,
  createStory,
  updateStory,
  softDeleteStory,
} from "../controllers/storyController";

const router = Router();
router.get("/", listStories);
router.post("/", createStory);
router.get("/:id", getStory);
router.put("/:id", updateStory);
router.delete("/:id", softDeleteStory);

export default router;

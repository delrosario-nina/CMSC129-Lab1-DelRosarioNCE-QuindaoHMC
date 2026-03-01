import { Router } from "express";
import {
  listStories,
  getStory,
  createStory,
} from "../controllers/storyController";

const router = Router();
router.get("/", listStories);
router.post("/", createStory);
router.get("/:id", getStory);

export default router;

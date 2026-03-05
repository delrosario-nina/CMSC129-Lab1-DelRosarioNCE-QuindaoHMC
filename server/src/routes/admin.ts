import { Router } from "express";
import {
  listDeletedStories,
  restoreStory,
  hardDeleteStory,
} from "../controllers/storyController";
import { requireAdminKey } from "../middleware/adminKey";

const router = Router();

// Every route under /api/v1/admin requires the X-Admin-Key header
router.use(requireAdminKey);

router.get("/stories/deleted",      listDeletedStories); // view the graveyard
router.put("/stories/:id/restore",  restoreStory);       // undo a soft delete
router.delete("/stories/:id",       hardDeleteStory);    // permanent — no undo

export default router;
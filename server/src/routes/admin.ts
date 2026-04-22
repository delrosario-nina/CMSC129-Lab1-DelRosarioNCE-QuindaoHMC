import { Router } from "express";
import {
  listDeletedStories,
  restoreStory,
  hardDeleteStory,
} from "../controllers/storyController";
import { requireAdminKey } from "../middleware/adminKey";
import { Library } from "../models";

const router = Router();

router.use(requireAdminKey);

router.get("/stories/deleted",      listDeletedStories);
router.put("/stories/:id/restore",  restoreStory);
router.delete("/stories/:id",       hardDeleteStory);
router.post("/fix-library-index", async (_req, res) => {
  try {
    await Library.collection.dropIndex("storyId_1");
    res.json({ message: "Fixed library index" });
  } catch (err: any) {
    if (err?.codeName === "IndexNotFound") {
      res.json({ message: "Index already correct" });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

export default router;
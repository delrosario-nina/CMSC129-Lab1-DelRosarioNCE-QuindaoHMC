import { Router } from "express";
import {
  listLibraries,
  addLibrary,
  removeLibrary,
} from "../controllers/libraryController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, listLibraries);
router.post("/", authenticate, addLibrary);
router.delete("/:id", authenticate, removeLibrary);

export default router;

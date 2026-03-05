import { Router } from "express";
import {
  listLibraries,
  addLibrary,
  removeLibrary,
} from "../controllers/libraryController";

const router = Router();

router.get("/",       listLibraries);
router.post("/",      addLibrary);
router.delete("/:id", removeLibrary);

export default router;

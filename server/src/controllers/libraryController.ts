import { Response, NextFunction } from "express";
import { Library, Story } from "../models";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import { validate, addToLibrarySchema } from "../config/validation";

export const listLibraries = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required to view library" });
      return;
    }

    const libraries = await Library.find({ userId: req.user._id })
      .populate("storyId")
      .lean();

    const validLibraries = libraries.filter(lib => lib.storyId && !(lib.storyId as any).deletedAt);

    res.json(validLibraries);
  } catch (err) {
    next(err);
  }
};

export const addLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required to add to library" });
      return;
    }

    const validation = validate(addToLibrarySchema, req.body);
    if (!validation.valid) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: validation.errors 
      });
      return;
    }

    const { storyId } = validation.data!;

    const story = await Story.findOne({ _id: storyId, deletedAt: null });
    if (!story) {
      throw new AppError("Story not found", 404);
    }

    const existingEntry = await Library.findOne({
      userId: req.user._id,
      storyId,
    });

    if (existingEntry) {
      throw new AppError("Story already in library", 409);
    }

    const library = await Library.create({
      userId: req.user._id,
      storyId,
    });

    const populatedLibrary = await Library.findById(library._id)
      .populate("storyId")
      .lean();

    res.status(201).json(populatedLibrary);
  } catch (err) {
    next(err);
  }
};

export const removeLibrary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required to remove from library" });
      return;
    }

    const library = await Library.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).lean();

    if (!library) {
      throw new AppError("Library entry not found", 404);
    }

    await Library.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

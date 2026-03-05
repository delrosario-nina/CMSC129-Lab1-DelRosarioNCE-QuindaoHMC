import { Request, Response, NextFunction } from "express";
import { Library } from "../models/library";
import { AppError } from "../middleware/errorHandler";

// GET libraries
export const listLibraries = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const libraries = await Library.find().populate("storyId").lean();
    res.json(libraries);
  } catch (err) {
    next(err);
  }
};

// POST libraries
export const addLibrary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { storyId } = req.body;
    if (!storyId) throw new AppError("storyId is required", 400);

    const library = await Library.create({ storyId });
    res.status(201).json(library);
  } catch (err) {
    next(err);
  }
};

// DELETE libraries
export const removeLibrary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id).lean();
    if (!library) throw new AppError("Library not found", 404);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
import { NextFunction, Request, Response } from "express";
import { Story } from "../models/story";
import { AppError } from "../middleware/errorHandler";

const wordCount = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const today = () => new Date().toISOString().slice(0, 10);

// --- Public Routes ---
// GET stories with optional filtering
export const listStories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Build filter object
    const filter: any = { deletedAt: null };

    // Optional author filter
    if (req.query.author) {
      filter.author = String(req.query.author);
    }

    // Pagination parameters
    const limit = Math.min(Number(req.query.limit) || 50, 100); // Max 100
    const skip = Math.max(Number(req.query.skip) || 0, 0); // Min 0

    // Fetch stories and total count
    const stories = await Story.find(filter)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Story.countDocuments(filter);

    res.json({
      data: stories,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });
  } catch (err) {
    next(new AppError("Failed to fetch stories", 500));
  }
};

// GET story by ID
export const getStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
      deletedAt: null,
    }).lean();
    if (!story) throw new AppError("Story not found", 404);
    res.json(story);
  } catch (err) {
    next(new AppError("Failed to fetch story", 500));
  }
};

// POST stories (create)
export const createStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, author, synopsis, content, genres, tags } = req.body;
    if (!title || !author)
      throw new AppError("Title and author are required", 400);

    const story = await Story.create({
      title,
      author,
      published: today(),
      lastUpdated: today(),
      genres,
      tags,
      synopsis,
      content,
      words: content ? wordCount(content) : 0,
    });

    res.status(201).json(story);
  } catch (err) {
    next(err);
  }
};

// PUT stories by ID (update stories)
export const updateStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.content) {
      req.body.words = wordCount(req.body.content);
    }
    req.body.lastUpdated = today();

    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      req.body,
      { new: true, runValidators: true },
    ).lean();

    if (!story) throw new AppError("Story not found", 404);
    res.json(story);
  } catch (err) {
    next(err);
  }
};

// (soft) DELETE stories
export const softDeleteStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    ).lean();

    if (!story) throw new AppError("Story not found", 404);
    res.json({ message: "Story deleted", id: story._id });
  } catch (err) {
    next(err);
  }
};

// --- Admin Routes ---
// GET all stories (including deleted)
export const listAllStories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stories = await Story.find().sort({ updatedAt: -1 }).lean();
    res.json(stories);
  } catch (err) {
    next(new AppError("Failed to fetch stories", 500));
  }
};

// GET deleted stories
export const listDeletedStories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const stories = await Story.find({ deletedAt: { $ne: null } })
      .sort({ deletedAt: -1 })
      .lean();
    res.json(stories);
  } catch (err) {
    next(err);
  }
};

// RESTORE deleted stories (PUT /api/v1/admin/stories/:id/restore)
export const restoreStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { deletedAt: null },
      { new: true },
    ).lean();

    if (!story) throw new AppError("Story not found or not deleted", 404);
    res.json(story);
  } catch (err) {
    next(err);
  }
};

// (hard) DELETE stories
export const hardDeleteStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id).lean();
    if (!story) throw new AppError("Story not found", 404);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

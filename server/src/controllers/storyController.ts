import { Response, NextFunction } from "express";
import { Story } from "../models";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../middleware/auth";
import { validate, createStorySchema, updateStorySchema } from "../config/validation";

const wordCount = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const today = () => new Date().toISOString().slice(0, 10);

export const listStories = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: Record<string, unknown> = { deletedAt: null };

    if (req.query.author) {
      filter.author = String(req.query.author);
    }

    if (req.query.genre) {
      filter.genres = String(req.query.genre);
    }

    if (req.query.search) {
      const searchRegex = new RegExp(String(req.query.search), "i");
      filter.$or = [
        { title: searchRegex },
        { synopsis: searchRegex },
        { author: searchRegex },
      ];
    }

    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const skip = Math.max(Number(req.query.skip) || 0, 0);

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
    next(err);
  }
};

export const getStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
      deletedAt: null,
    }).lean();

    if (!story) throw new AppError("Story not found", 404);

    res.json(story);
  } catch (err) {
    next(err);
  }
};

export const createStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required to create a story" });
      return;
    }

    const validation = validate(createStorySchema, req.body);
    if (!validation.valid) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: validation.errors 
      });
      return;
    }

    const data = validation.data!;
    const story = await Story.create({
      title: data.title,
      author: req.user.username,
      authorId: req.user._id,
      published: today(),
      lastUpdated: today(),
      genres: data.genres || [],
      tags: data.tags || [],
      synopsis: data.synopsis || "",
      content: data.content,
      words: wordCount(data.content),
    });

    res.status(201).json(story);
  } catch (err) {
    next(err);
  }
};

export const updateStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required to update a story" });
      return;
    }

    const validation = validate(updateStorySchema, req.body);
    if (!validation.valid) {
      res.status(400).json({ 
        message: "Validation failed",
        errors: validation.errors 
      });
      return;
    }

    const existingStory = await Story.findOne({
      _id: req.params.id,
      deletedAt: null,
    });

    if (!existingStory) {
      throw new AppError("Story not found", 404);
    }

    if (existingStory.authorId.toString() !== req.user._id) {
      throw new AppError("You can only edit your own stories", 403);
    }

    const data = validation.data!;
    const updateData: Record<string, unknown> = {};
    
    if (data.title !== undefined) updateData.title = data.title;
    if (data.synopsis !== undefined) updateData.synopsis = data.synopsis;
    if (data.content !== undefined) {
      updateData.content = data.content;
      updateData.words = wordCount(data.content);
    }
    if (data.genres !== undefined) updateData.genres = data.genres;
    if (data.tags !== undefined) updateData.tags = data.tags;
    updateData.lastUpdated = today();

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: "after", runValidators: true }
    ).lean();

    res.json(story);
  } catch (err) {
    next(err);
  }
};

export const softDeleteStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required to delete a story" });
      return;
    }

    const existingStory = await Story.findOne({
      _id: req.params.id,
      deletedAt: null,
    });

    if (!existingStory) {
      throw new AppError("Story not found", 404);
    }

    if (existingStory.authorId.toString() !== req.user._id) {
      throw new AppError("You can only delete your own stories", 403);
    }

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { returnDocument: "after" }
    ).lean();

    res.json({ message: "Story deleted", id: story._id });
  } catch (err) {
    next(err);
  }
};

export const listAllStories = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const stories = await Story.find().sort({ updatedAt: -1 }).lean();
    res.json(stories);
  } catch (err) {
    next(new AppError("Failed to fetch stories", 500));
  }
};

export const listDeletedStories = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
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

export const restoreStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { deletedAt: null },
      { new: true }
    ).lean();

    if (!story) throw new AppError("Story not found or not deleted", 404);
    res.json(story);
  } catch (err) {
    next(err);
  }
};

export const hardDeleteStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id).lean();
    if (!story) throw new AppError("Story not found", 404);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

import { Request, Response } from "express";
import { Story } from "../models/story";

export const listStories = async (req: Request, res: Response) => {
  const stories = await Story.find().limit(50).lean();
  res.json(stories);
};

export const getStory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const story = await Story.findById(id).lean();
  if (!story) return res.status(404).json({ message: "Not found" });
  res.json(story);
};

export const createStory = async (req: Request, res: Response) => {
  const data = req.body;
  const created = await Story.create(data);
  res.status(201).json(created);
};

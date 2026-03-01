import { Schema, model } from "mongoose";

const StorySchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    coverImage: String,
    genre: String,
    reads: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Story = model("Story", StorySchema);

import { Schema } from "mongoose";

export const LibrarySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    storyId: { type: Schema.Types.ObjectId, ref: "Story", required: true },
  },
  { timestamps: true }
);

LibrarySchema.index({ userId: 1, storyId: 1 }, { unique: true });
LibrarySchema.index({ userId: 1 });

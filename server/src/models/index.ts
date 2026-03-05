import { Schema } from "mongoose";
import { primaryDB, backupDB } from "../config/db";

const StorySchema = new Schema(
  {
    title:        { type: String, required: true },
    author:       { type: String, required: true },
    published:    { type: String, default: "" },
    lastUpdated:  { type: String, default: "" },
    genres:       { type: [String], default: [] },
    tags:         { type: [String], default: [] }, 
    words:        { type: Number, default: 0 },
    synopsis:     { type: String, default: "" },
    content:      { type: String, default: "" },
    deletedAt:   { type: Date,     default: null }
  },
  { timestamps: true }
);

const LibrarySchema = new Schema(
  {
    storyId: { type: Schema.Types.ObjectId, ref: "Story", required: true },
  },
  { timestamps: true }
);
LibrarySchema.index({ storyId: 1 }, { unique: true });

// each model registered on its own connection
export const getPrimaryModels = () => ({
  Story:   primaryDB.model("Story",   StorySchema),
  Library: primaryDB.model("Library", LibrarySchema),
});

export const getBackupModels = () => ({
  Story:   backupDB.model("Story",   StorySchema),
  Library: backupDB.model("Library", LibrarySchema),
});
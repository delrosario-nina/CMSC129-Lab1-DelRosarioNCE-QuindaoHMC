import { Schema } from "mongoose";

export const StorySchema = new Schema(
  {
    title:        { type: String, required: true },
    author:       { type: String, required: true },
    authorId:     { type: Schema.Types.ObjectId, ref: "User", required: true },
    published:    { type: String, default: "" },
    lastUpdated:  { type: String, default: "" },
    genres:       { type: [String], default: [] },
    tags:         { type: [String], default: [] }, 
    words:        { type: Number, default: 0 },
    synopsis:     { type: String, default: "" },
    content:      { type: String, default: "" },
    deletedAt:    { type: Date, default: null }
  },
  { timestamps: true },
);

StorySchema.index({ author: 1 });
StorySchema.index({ authorId: 1 });
StorySchema.index({ genres: 1 });
StorySchema.index({ deletedAt: 1 });
StorySchema.index({ updatedAt: -1 });
StorySchema.index({ title: "text", synopsis: "text" });

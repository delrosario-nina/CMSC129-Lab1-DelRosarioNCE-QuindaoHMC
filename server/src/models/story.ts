import { Schema, model } from "mongoose";
import { transferableAbortSignal } from "node:util";

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
  { timestamps: true },
);

export const Story = model("Story", StorySchema);

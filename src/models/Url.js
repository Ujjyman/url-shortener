import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true, index: true },
    destination: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    lastAccessedAt: { type: Date },
    meta: {} // extend later (ownerId, tags, etc.)
  },
  { timestamps: true }
);

export default mongoose.model("Url", UrlSchema);

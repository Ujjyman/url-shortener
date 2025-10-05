import Url from "../models/Url.js";
import { nanoid } from "nanoid";
import { createUrlSchema } from "../lib/validate.js";

const normalizeUrl = (u) => new URL(u).toString();

export const createShortUrl = async (req, res, next) => {
  try {
    const parsed = createUrlSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.format() });
    }

    const { destination, customSlug } = parsed.data;
    const dest = normalizeUrl(destination);

    let shortId = customSlug || nanoid(7);

    // ensure uniqueness
    let exists = await Url.findOne({ shortId });
    if (exists) {
      if (customSlug) return res.status(409).json({ error: "Custom slug already taken" });
      do { shortId = nanoid(7); exists = await Url.findOne({ shortId }); } while (exists);
    }

    const doc = await Url.create({ shortId, destination: dest });
    const base = process.env.BASE_URL.replace(/\/$/, "");
    return res.status(201).json({
      shortId,
      shortUrl: `${base}/${shortId}`,
      destination: doc.destination,
      createdAt: doc.createdAt
    });
  } catch (err) { next(err); }
};

export const redirect = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const doc = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 }, $set: { lastAccessedAt: new Date() } },
      { new: true }
    );
    if (!doc) return res.status(404).send("Link not found");
    return res.redirect(302, doc.destination);
  } catch (err) { next(err); }
};

export const stats = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const doc = await Url.findOne({ shortId });
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json({
      shortId: doc.shortId,
      destination: doc.destination,
      clicks: doc.clicks,
      lastAccessedAt: doc.lastAccessedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  } catch (err) { next(err); }
};

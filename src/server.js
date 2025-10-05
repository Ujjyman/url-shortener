import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/url.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ✅ 1. Security & middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

// ✅ 2. Serve static files (must come BEFORE routes)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// ✅ 3. Serve mystats.html with clean URL (important: before routes!)
app.get("/mystats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/mystats.html"));
});

// ✅ 4. API & redirect routes
app.use("/", routes);

// ✅ 5. Error handling
app.use(notFound);
app.use(errorHandler);

// ✅ 6. Connect DB & start server
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Mongo connection error:", err.message);
    process.exit(1);
  });

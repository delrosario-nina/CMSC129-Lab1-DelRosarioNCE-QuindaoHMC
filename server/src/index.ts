import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import storiesRouter   from "./routes/stories";
import librariesRouter from "./routes/libraries";
import adminRouter     from "./routes/admin";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(rateLimit({ windowMs:   15 * 60 * 1000, max: 100 }));
// Body parsing
app.use(express.json());

// Health Check
app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));
// Public Routes
app.use("/api/v1/stories", storiesRouter);
app.use("/api/v1/libraries", librariesRouter);
// Admin Routes (protected by env.ADMIN_KEY, for hard delete)
app.use("/api/v1/admin", adminRouter);

// Error handler)
app.use(errorHandler);

const port = process.env.PORT || 4000;

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
  .catch((err) => {
    console.error("DB connect failed", err);
    process.exit(1);
  });

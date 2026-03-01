import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Body parsing
app.use(express.json());

// Routes (add yours here)
app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));

// Error handler (must be last)
app.use(errorHandler);

const port = process.env.PORT || 4000;

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
  .catch((err) => {
    console.error("DB connect failed", err);
    process.exit(1);
  });

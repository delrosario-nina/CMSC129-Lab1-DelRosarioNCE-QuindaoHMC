import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import storiesRouter from "./routes/stories";
import librariesRouter from "./routes/libraries";
import adminRouter from "./routes/admin";

const app = express();

// Security middleware
// app.use(helmet()); // Temporarily disabled for debugging
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Temporarily disabled for debugging
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

const port = process.env.PORT;

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
  .catch((err) => {
    console.error("DB connect failed", err);
    process.exit(1);
  });

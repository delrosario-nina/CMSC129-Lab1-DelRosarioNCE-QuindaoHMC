import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";
import storiesRouter from "./routes/stories";
import librariesRouter from "./routes/libraries";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());

app.use(cors({ 
  origin: env.CORS_ORIGIN, 
  credentials: true 
}));

const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many authentication attempts, please try again later." },
});
app.use("/api/v1/auth", authLimiter);

app.use(express.json({ limit: "10mb" }));

app.get("/api/v1/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stories", storiesRouter);
app.use("/api/v1/libraries", librariesRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);

const port = env.PORT;

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
  .catch((err) => {
    console.error("DB connect failed", err);
    process.exit(1);
  });

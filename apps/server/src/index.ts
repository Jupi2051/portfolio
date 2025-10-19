import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./context";

const app = express();

// Debug logging
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "CORS origins:",
  process.env.NODE_ENV === "production"
    ? ["https://jupi.dev", "https://www.jupi.dev"]
    : ["http://localhost:5173", "http://localhost:3000"]
);

// Apply CORS to ALL routes first
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://jupi.dev", "https://www.jupi.dev"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
    ],
  })
);

// Handle preflight requests
app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    req.headers.origin || "https://jupi.dev"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie, X-Requested-With"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(cookieParser());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `CORS configured for: ${
      process.env.NODE_ENV === "production" ? "production" : "development"
    }`
  );
});

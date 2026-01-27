import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import { createContext } from "./context";
import monitorCustomersPageRouter from "./monitor-customers-page";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://jupi.dev"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true, // Important for cookies
  }),
);

app.use(cookieParser()); // Add cookie parser middleware

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.use("/monitor-customers-page", monitorCustomersPageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import "dotenv/config"
import path from "node:path"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from "./router"
import { createContext } from "./context"
import monitorCustomersPageRouter from "./monitor-customers-page"
import { createVicoSketchImageUploadRouter } from "./modules/vico/create"
import { prepareVicoSketchWebpImages } from "./modules/vico/prepare-images"

const app = express()

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://jupi.dev", "https://api.jupi.dev"]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true, // Important for cookies
  }),
)

app.use(cookieParser()) // Add cookie parser middleware

const imagesBucket = process.env.IMAGES_BUCKET
if (imagesBucket) {
  app.use("/vico-sketch-images", express.static(path.resolve(imagesBucket)))
}

app.use("/vico", createVicoSketchImageUploadRouter())

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.use("/monitor-customers-page", monitorCustomersPageRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  prepareVicoSketchWebpImages()
})

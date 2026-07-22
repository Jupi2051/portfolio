import "dotenv/config"
import path from "node:path"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from "./router"
import { createContext } from "./context"
import { createVicoSketchImageUploadRouter } from "./modules/vico/create"
import { prepareVicoSketchWebpImages } from "./modules/vico/prepare-images"

const app = express()

console.log("process.env.NODE_ENV", process.env.NODE_ENV)

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
  const imagesDir = path.resolve(imagesBucket)
  app.use(
    "/vico-sketch-images",
    (req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") {
        next()
        return
      }
      const stripped = path
        .normalize(req.path)
        .replace(/^(\.\.(\/|\\|$))+/, "")
        .replace(/^\//, "")
      if (!stripped || stripped.includes("..")) {
        next()
        return
      }
      const filePath = path.join(imagesDir, stripped)
      const fromRoot = path.relative(imagesDir, filePath)
      if (fromRoot.startsWith("..") || path.isAbsolute(fromRoot)) {
        next()
        return
      }
      res.once("finish", () => {
        if (res.statusCode === 200 || res.statusCode === 304) {
          console.log(
            `[vico image] pulled ${filePath} status=${res.statusCode} method=${req.method}`,
          )
        }
      })
      next()
    },
    express.static(imagesDir),
  )
}

app.use("/vico", createVicoSketchImageUploadRouter())

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  prepareVicoSketchWebpImages()
})

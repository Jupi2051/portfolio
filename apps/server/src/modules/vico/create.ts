import fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";

function getImagesBucketDir(): string {
  const bucket = process.env.IMAGES_BUCKET;
  if (!bucket) {
    throw new Error("IMAGES_BUCKET is not set");
  }
  return path.resolve(bucket);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

/**
 * Express routes for Vico sketch image upload (multipart: field `image`, body `sketchId`).
 */
export function createVicoSketchImageUploadRouter(): express.Router {
  const router = express.Router();

  router.post(
    "/sketch-image",
    upload.single("image"),
    async (req, res) => {
      try {
        const sketchId =
          typeof req.body?.sketchId === "string" ? req.body.sketchId : undefined;
        if (!sketchId) {
          res.status(400).json({ error: "sketchId is required" });
          return;
        }
        if (!req.file?.buffer) {
          res.status(400).json({ error: "image file is required (field name: image)" });
          return;
        }

        const dir = getImagesBucketDir();
        await fs.mkdir(dir, { recursive: true });

        const record = await prisma.vicoSketchImage.create({
          data: {
            sketchId,
            data: new Uint8Array(req.file.buffer),
          },
        });

        const outPath = path.join(dir, `${record.id}.webp`);
        await sharp(req.file.buffer).webp().toFile(outPath);

        res.status(201).json({
          id: record.id,
          sketchId: record.sketchId,
          fileName: `${record.id}.webp`,
        });
      } catch (err) {
        if (
          err &&
          typeof err === "object" &&
          "code" in err &&
          (err as { code: string }).code === "P2002"
        ) {
          res
            .status(409)
            .json({ error: "An image already exists for this sketch" });
          return;
        }
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
      }
    },
  );

  return router;
}

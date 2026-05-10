import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";

/**
 * Loads every `VicoSketchImage` row and writes `${id}.webp` under `process.env.IMAGES_BUCKET`.
 */
export async function prepareVicoSketchWebpImages(): Promise<void> {
  const bucket = process.env.IMAGES_BUCKET;
  if (!bucket) {
    throw new Error("IMAGES_BUCKET is not set");
  }

  const dir = path.resolve(bucket);
  await fs.mkdir(dir, { recursive: true });

  const images = await prisma.vicoSketchImage.findMany({
    where: { deletedAt: null },
    select: { id: true, data: true },
  });

  for (const row of images) {
    const outPath = path.join(dir, `${row.id}.webp`);
    await sharp(Buffer.from(row.data)).webp().toFile(outPath);
    console.log(`[vico image] created on disk (prepare) imageId=${row.id} path=${outPath}`);
  }

  if (images.length > 0) {
    console.log(
      `[vico image] prepare finished: wrote ${images.length} file(s) under ${dir}`,
    );
  }
}

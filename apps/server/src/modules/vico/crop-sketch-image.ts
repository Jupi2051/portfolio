import fs from "node:fs/promises";
import path from "node:path";
import { TRPCError } from "@trpc/server";
import sharp from "sharp";
import { z } from "zod";
import { protectedProcedure } from "@/lib/trpc";

function getImagesBucketDir(): string {
  const bucket = process.env.IMAGES_BUCKET;
  if (!bucket) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "IMAGES_BUCKET is not set",
    });
  }
  return path.resolve(bucket);
}

function clampCropToMetadata(
  crop: { left: number; top: number; width: number; height: number },
  metaWidth: number,
  metaHeight: number,
): { left: number; top: number; width: number; height: number } {
  let { left, top, width, height } = crop;
  left = Math.max(0, Math.min(left, metaWidth - 1));
  top = Math.max(0, Math.min(top, metaHeight - 1));
  width = Math.min(width, metaWidth - left);
  height = Math.min(height, metaHeight - top);
  width = Math.max(1, width);
  height = Math.max(1, height);
  return { left, top, width, height };
}

const cropSketchImage = protectedProcedure
  .input(
    z.object({
      imageId: z.string(),
      crop: z.object({
        left: z.number().int().min(0),
        top: z.number().int().min(0),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      }),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const row = await ctx.prisma.vicoSketchImage.findFirst({
      where: { id: input.imageId, deletedAt: null },
    });

    if (!row) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Sketch image not found" });
    }

    const dir = getImagesBucketDir();
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${input.imageId}.webp`);

    let inputBuffer: Buffer;
    try {
      inputBuffer = await fs.readFile(filePath);
    } catch {
      inputBuffer = Buffer.from(row.data);
    }

    const pipeline = sharp(inputBuffer);
    const meta = await pipeline.metadata();
    const iw = meta.width ?? 0;
    const ih = meta.height ?? 0;
    if (!iw || !ih) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Could not read image dimensions",
      });
    }

    const crop = clampCropToMetadata(input.crop, iw, ih);

    const outBuffer = await sharp(inputBuffer)
      .extract({
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
      })
      .webp({ quality: 92 })
      .toBuffer();

    await fs.writeFile(filePath, outBuffer);

    await ctx.prisma.vicoSketchImage.update({
      where: { id: input.imageId },
      data: {
        data: new Uint8Array(outBuffer),
      },
    });

    return { ok: true as const };
  });

export default cropSketchImage;

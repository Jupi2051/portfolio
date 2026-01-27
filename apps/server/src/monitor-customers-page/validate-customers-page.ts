import { chromium } from "playwright";
import sharp from "sharp";
import getPixelColor from "./get-pixel-color";
import path from "path";
import fs from "fs";

// const customersPageUrl = 'http://homepage.instatus:8000/customers'
const customersPageUrl = "https://instatus.com/customers";

/** Chromium args and launch opts so WebGL canvas.toDataURL() works on headless Linux (no GPU). */
function getChromiumLaunchOptions(): {
  args: string[];
  ignoreDefaultArgs?: string[];
} {
  const args = ["--use-gl=angle"];
  if (process.platform === "linux") {
    // SwiftShader WebGL fallback (required when automatic fallback is deprecated).
    // See https://chromium.googlesource.com/chromium/src/+/main/docs/gpu/swiftshader.md
    args.push(
      "--use-angle=swiftshader-webgl",
      "--enable-unsafe-swiftshader",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu-sandbox",
    );
    return {
      args,
      ignoreDefaultArgs: ["--disable-gpu"],
    };
  }
  return { args };
}

const validateCustomersPage = async () => {
  const launchOpts = getChromiumLaunchOptions();
  const browser = await chromium.launch({
    headless: true,
    args: launchOpts.args,
    ...(launchOpts.ignoreDefaultArgs && {
      ignoreDefaultArgs: launchOpts.ignoreDefaultArgs,
    }),
  });
  const context = await browser.newContext({
    viewport: { width: 300, height: 200 },
  });
  const page = await context.newPage();

  await page.addInitScript(`
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, attrs) {
      if (type === 'webgl' || type === 'webgl2') {
        attrs = Object.assign({}, attrs || {}, {
          preserveDrawingBuffer: true,
          premultipliedAlpha: false,
        });
      }
      return original.call(this, type, attrs);
    };
  `);

  await page.goto(customersPageUrl, { waitUntil: "load" });
  console.log("page loaded");
  console.log("finding canvas...");
  const theCanvas = page.locator("canvas[data-engine]");
  await theCanvas.waitFor({ state: "visible" });
  console.log("canvas found and visible");
  await page.waitForTimeout(5 * 1000);

  // Wait for at least one composited frame so the WebGL buffer is committed (Linux headless).
  await page.evaluate(() => {
    const raf = (globalThis as typeof globalThis & { requestAnimationFrame: (cb: () => void) => number }).requestAnimationFrame;
    return new Promise<void>((resolve) => {
      raf(() => raf(() => resolve()));
    });
  });

  console.log("taking screenshot of canvas...");
  const dataUrl = await page.evaluate(() => {
    //@ts-ignore
    const canvas = document.querySelector(
      "canvas[data-engine]",
      //@ts-ignore
    ) as HTMLCanvasElement;
    return canvas ? canvas.toDataURL("image/jpeg", 0.05) : null;
  });
  console.log("screenshot taken");

  if (!dataUrl) throw new Error("Canvas not found or toDataURL failed");
  console.log("dataUrl found converting to base jpeg buffer");
  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
  const realtimeScreenshotData = Buffer.from(base64Data, "base64");
  console.log("realtimeScreenshotData found");
  // await fs.promises.writeFile(
  //   path.join(__dirname, 'realtime-screenshot-dada-dodo.png'),
  //   realtimeScreenshotData
  // )

  console.log("closing browser");
  await browser.close();
  console.log("browser closed");

  console.log("converting realtimeScreenshotData to imageData");

  const { width, height } = await sharp(realtimeScreenshotData).metadata();

  const imageData = await sharp(realtimeScreenshotData)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let isColorFound = false;

  console.log("checking for colors in the image");
  try {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = await getPixelColor(imageData, x, y);
        if (color.r >= 60 && color.g >= 60 && color.b >= 60) {
          isColorFound = true;
          break;
        }
      }
      if (isColorFound) break;
    }
  } catch (error: unknown) {
    console.log("error", (error as Error).message ?? "Unknown error");
  }

  return isColorFound;
};

export default validateCustomersPage;

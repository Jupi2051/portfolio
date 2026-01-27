import { chromium } from "playwright";
import sharp from "sharp";
import getPixelColor from "./get-pixel-color";
import path from "path";
import fs from "fs";

// const customersPageUrl = 'http://homepage.instatus:8000/customers'
const customersPageUrl = "https://instatus.com/customers";

/** Chromium args so WebGL canvas.toDataURL() works on headless Linux (no GPU). */
function getChromiumArgs(): string[] {
  const args = ["--use-gl=angle"];
  if (process.platform === "linux") {
    args.push(
      "--use-angle=swiftshader",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu-sandbox",
    );
  }
  return args;
}

const validateCustomersPage = async () => {
  const browser = await chromium.launch({
    headless: true,
    args: getChromiumArgs(),
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

  const spaceToCheckColors = {
    topLeft: { x: 150, y: 150 },
    bottomRight: { x: 200, y: 200 },
  };

  console.log("converting realtimeScreenshotData to imageData");

  const { width, height } = await sharp(realtimeScreenshotData).metadata();

  const imageData = await sharp(realtimeScreenshotData)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let isColorFound = false;

  console.log("checking for colors in the image");
  try {
    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        const color = await getPixelColor(imageData, x, y);
        console.log("color", color);
        if (color.r >= 60 && color.g >= 60 && color.b >= 60) {
          isColorFound = true;
          console.log("color found", color);
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

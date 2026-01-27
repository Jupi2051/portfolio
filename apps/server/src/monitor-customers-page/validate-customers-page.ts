import { chromium } from "playwright";
import sharp from "sharp";
import getPixelColor from "./get-pixel-color";
import path, { dirname } from "path";

const customersPageUrl = "https://instatus.com/customers";

const validateCustomersPage = async ({
  scroll = { x: 0, y: 0 },
}: {
  scroll: { x: number; y: number };
}) => {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(customersPageUrl, { waitUntil: "load" });
  await page.mouse.move(0, 0);
  await page.mouse.wheel(scroll.x ?? 0, scroll.y ?? 0);
  await page.waitForTimeout(5 * 1000);

  const realtimeScreenshotData = await page.screenshot({
    path: path.join(__dirname, "realtime-screenshot.png"),
  });

  await browser.close();

  const spaceToCheckColors = {
    topLeft: { x: 100, y: 100 },
    bottomRight: { x: 500, y: 500 },
  };

  const imageData = await sharp(realtimeScreenshotData)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let isColorFound = false;

  for (
    let y = spaceToCheckColors.topLeft.y;
    y <= spaceToCheckColors.bottomRight.y;
    y++
  ) {
    for (
      let x = spaceToCheckColors.topLeft.x;
      x <= spaceToCheckColors.bottomRight.x;
      x++
    ) {
      const color = await getPixelColor(imageData, x, y);
      if (
        color.r >= 100 &&
        color.g >= 150 &&
        color.b >= 150 &&
        color.r !== 255 &&
        color.g !== 255 &&
        color.b !== 255
      ) {
        isColorFound = true;
        break;
      }
    }
    if (isColorFound) break;
  }

  return isColorFound;
};

export default validateCustomersPage;

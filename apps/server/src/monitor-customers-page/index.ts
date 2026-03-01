import express, { Router } from "express";
import validateCustomersPage from "./validate-customers-page";

const router: Router = express.Router();

let isCheckingModel = false;
let latestValidationResult: boolean | null = null;

router.get("/customers-page-model-status", async (req, res) => {
  if (isCheckingModel) {
    res.json({
      up: latestValidationResult,
    });
    return;
  }
  isCheckingModel = true;
  const isCustomersPageLoaded = await validateCustomersPage();
  isCheckingModel = false;
  latestValidationResult = isCustomersPageLoaded;

  res.json({
    up: isCustomersPageLoaded,
  });
});

export default router;

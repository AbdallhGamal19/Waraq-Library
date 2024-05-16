import { Router } from "express";
import * as authController from "./controller/auth.js";
import * as authValidation from "./validation.js";
import validationMidelWare from "../../midelWare/validation.js";

const router = Router();
router.post(
  "/sginUp",
  validationMidelWare(authValidation.sginUp),
  authController.sginUp
);
router.post(
  "/logIn",
  validationMidelWare(authValidation.logIn),
  authController.logIn
);
router.get("/confirmEmail/:token", authController.confirmEmail);

export default router;

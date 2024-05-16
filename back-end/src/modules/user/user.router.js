import { Router } from "express";
import * as userController from "./user.js";
import authentication from "../../midelWare/auth.js";

const router = Router();
router.get("/", authentication, userController.getUser);
router.post("/delete", authentication, userController.deleteUser);
router.post("/update", authentication, userController.updateUser);
export default router;

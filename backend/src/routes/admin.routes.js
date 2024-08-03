import { Router } from "express";
import { changePassword, loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWTToken, logoutAdmin);
router.route("/changePassword").post(verifyJWTToken, changePassword);


export default router
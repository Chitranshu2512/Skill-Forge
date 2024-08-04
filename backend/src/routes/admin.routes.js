import { Router } from "express";
import { changePassword, loginAdmin, logoutAdmin, addCourse, userRegister} from "../controllers/admin.controller.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWTToken, logoutAdmin);
router.route("/changePassword").post(verifyJWTToken, changePassword);
router.route("/addCourse").post(verifyJWTToken, upload.fields([
    {
        name: "imageUrl",
        maxCount: 1
    }
]), addCourse)

router.route("/userRegister").post(userRegister)


export default router
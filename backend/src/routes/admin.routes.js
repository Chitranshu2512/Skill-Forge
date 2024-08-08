import { Router } from "express";
import { changePassword, loginAdmin, logoutAdmin, addCourse, editCourse, updateCourse} from "../controllers/admin.controller.js";
import { verifyJWTTokenAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
// api/admin/
router.route("/login").post(loginAdmin);

router.route("/logout").post(verifyJWTTokenAdmin, logoutAdmin);

router.route("/changePassword").post(verifyJWTTokenAdmin, changePassword);

// router.route("/addCourse").post(verifyJWTToken, upload.fields([
//     {
//         name: "imageUrl",
//         maxCount: 1
//     }
// ]), addCourse)

router.route("/addCourse").post(addCourse)

router.route("/editCourse/:courseId").get(editCourse)
router.route("/updateCourse/:courseId").post(updateCourse)


export default router
import { Router } from "express";
import { checkAdmin, changePassword, loginAdmin, logoutAdmin, addCourse, editCourse, updateCourse, getCourses, getUsers} from "../controllers/admin.controller.js";
import { verifyJWTTokenAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
// api/admin/
router.route("/").get(verifyJWTTokenAdmin, checkAdmin)

router.route("/login").post(loginAdmin);

router.route("/logout").post(verifyJWTTokenAdmin, logoutAdmin);

router.route("/changePassword").post(verifyJWTTokenAdmin, changePassword);

router.route("/addCourse").post(verifyJWTTokenAdmin,addCourse)

router.route("/editCourse/:courseId").get(editCourse)

router.route("/courses").get(verifyJWTTokenAdmin, getCourses)

router.route("/users").get(verifyJWTTokenAdmin, getUsers)

router.route("/updateCourse/:courseId").post(updateCourse)


export default router
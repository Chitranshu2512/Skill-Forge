import { Router } from "express"
import { registerUser, getCourses } from "../controllers/user.controller.js";
import { verifyJWTTokenUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)

router.route("/courses").get(verifyJWTTokenUser, getCourses)



export default router
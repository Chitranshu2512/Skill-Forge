import { Router } from "express"
import { registerUser, getCourses } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)

router.route("/courses").get(getCourses)



export default router
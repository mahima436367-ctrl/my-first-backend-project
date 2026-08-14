// router bnayenge

// import krenge router ko express se 
// jaise express se app bnare the waise hi router se route bnayenge

import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const router = Router()
router.route("/register").post(registerUser)


export default router



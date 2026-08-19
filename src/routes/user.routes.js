// router bnayenge

// import krenge router ko express se
// jaise express se app bnare the waise hi router se route bnayenge

import { Router } from "express";
import { registerUser, getUsers } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount:1,
    },
  ]),
  registerUser
);

router.route("/").get(getUsers);

export default router;

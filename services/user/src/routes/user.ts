import express from "express";
import { loginUser, myProfile } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();


router.post("/login", loginUser);
router.get("/profile",isAuth, myProfile);
export default router;
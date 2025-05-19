import express from "express";
import { getUserProfile, loginUser, myProfile, updateUser } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();


router.post("/login", loginUser);
router.get("/profile",isAuth, myProfile);
router.get("/user/:id", getUserProfile);
router.post("/user/:id", isAuth, updateUser);
export default router;
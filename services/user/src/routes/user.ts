import express from "express";
import { getUserProfile, loginUser, myProfile, updateProfilePicture, updateUser } from "../controllers/user";
import { isAuth } from "../middleware/isAuth";
import uploadfile from "../middleware/multer";

const router = express.Router();


router.post("/login", loginUser);
router.get("/profile",isAuth, myProfile);
router.get("/user/:id", getUserProfile);
router.post("/user/:id", isAuth, updateUser);
router.post("/user/:id/profile-picture", isAuth, uploadfile, updateProfilePicture);
export default router;
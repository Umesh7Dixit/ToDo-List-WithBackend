import express from "express"


import {  getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAutenticated } from "../middlewares/auth.js";



const router = express.Router()

// router.get("/all", getAllUsers );

router.post("/new", register);

router.post("/login", login);

router.post("/logout", logout);
 
router.get("/me",isAutenticated, getMyProfile)

export default router;
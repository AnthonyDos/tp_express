import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
// import {signup} from "../controllers/user.js";
import {signup, login} from "../controllers/user.js";
//import {signup} from "../server.js";
router.get("/", HomeController);
router.post("/", signup)
router.post("/login", login)

export default router;
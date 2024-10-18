import express from "express";
 const router=express.Router();
 import { signUp,signIn } from "../controllers/Auth.controller.js";


router.post("/signup",signUp);
router.post("/signin",signIn)



export default router;
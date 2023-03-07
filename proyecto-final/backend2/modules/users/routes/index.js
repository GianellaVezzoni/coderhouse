import express from "express";
import { MongoContainer } from "../../../utils/mongoContainer.js";
import { usersSchema } from "../model/index.js";
import passport from "passport";
import { loginStrategy, registerStrategy, postUser } from "../controller/handler.js";

const { Router } = express;
const router = Router();
passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

export const userContainer = new MongoContainer(usersSchema);
router.post("/login", passport.authenticate("login", { failureRedirect: "/loginError" }), postUser);
router.post("/register", passport.authenticate("register", { failureRedirect: "/registerError" }), postUser);
export default router;
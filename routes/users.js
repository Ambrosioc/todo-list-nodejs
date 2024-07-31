import express from "express";
import User from "../models/users.js";
import userController from "../controllers/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const users = await User.findAll();
	res.json(users);
});

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/protected", userController.protected);

export default router;

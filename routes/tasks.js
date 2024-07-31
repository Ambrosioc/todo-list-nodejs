import express from "express";
import Task from "../models/tasks.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const tasks = await Task.findAll();
	res.json(tasks);
});

router.post("/", async (req, res) => {
	const { title, description } = req.body;

	try {
		const task = await Task.create({
			title,
			description,
		});

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

export default router;

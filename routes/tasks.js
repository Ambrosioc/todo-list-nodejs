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

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const task = await Task.findByPk(id);

	if (!task) {
		res.status(404).json({ message: "Task not found" });
	} else {
		res.json(task);
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	const task = await Task.findByPk(id);

	if (!task) {
		res.status(404).json({ message: "Task not found" });
	} else {
		task.title = title;
		task.description = description;

		await task.save();

		res.json(task);
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const task = await Task.findByPk(id);

	if (!task) {
		res.status(404).json({ message: "Task not found" });
	} else {
		await task.destroy();
		res.json({ message: "Task deleted" });
	}
});
export default router;

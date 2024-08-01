import bodyParser from "body-parser";
import express from "express";
import taskRoutes from "./routes/tasks.js";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

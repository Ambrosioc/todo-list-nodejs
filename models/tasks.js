import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Task = db.define("Task", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

db.sync().then(() => {
	console.log("Table created!");
});

export default Task;

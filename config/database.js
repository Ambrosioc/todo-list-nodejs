import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo-list-nodejs", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

export default sequelize;

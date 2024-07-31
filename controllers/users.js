import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import authenticate from "../middleware/auth.js";
import User from "../models/users.js";

const userController = {
	register: async (req, res) => {
		const { username, email, password } = req.body;

		try {
			const user = await User.create({
				username,
				email,
				password: await bcrypt.hash(password, 10),
			});

			res.json(user);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "An error occurred" });
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				return res.status(401).json({ message: "Incorrect password" });
			}

			const token = jwt.sign(
				{ id: user.id },
				jwtConfig.secret,
				jwtConfig.options
			);

			res.json({ token });
			console.log("User logged in");
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "An error occurred" });
		}
	},
	protected: [
		authenticate,
		async (req, res) => {
			res.json({ message: "Protected route", user: req.user });
		},
	],
};

export default userController;

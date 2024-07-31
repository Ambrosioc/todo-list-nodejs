import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

const auth = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({
			message: "No token provided or invalide format",
		});
	}

	const token = authHeader.split(" ")[1];

	jwt.verify(token, jwtConfig.secret, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.userId = decoded.id;
		next();
	});
};

export default auth;

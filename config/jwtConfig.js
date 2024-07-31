export default {
	secret: process.env.JWT_SECRET,
	options: {
		expiresIn: "1h",
	},
};

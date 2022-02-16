const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
	attachCookiesToResponse,
	createTokenUser,
	sendVerificationEmail,
	sendResetPasswordEmail,
	createHash,
} = require("../utils");
const crypto = require("crypto");

// REGISTER
const register = async (req, res) => {
	const { email, name, password } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError("Email already exists");
	}

	// first registered user is an admin
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? "admin" : "user";

	const user = await User.create({ name, email, password, role });

	const tokenUser = createTokenUser(user);

	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// LOGIN
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new CustomError.BadRequestError("Please provide email and password");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError.UnauthenticatedError("Invalid Credentials");
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError("Invalid Credentials");
	}

	const tokenUser = createTokenUser(user);

	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// LOGOUT
const logout = async (req, res) => {
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
	res.send("verifyEmail");
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
	res.send("resetPassword");
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
	res.send("forgotPassword");
};

module.exports = {
	register,
	login,
	logout,
	verifyEmail,
	resetPassword,
	forgotPassword,
};

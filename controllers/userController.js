const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
	createTokenUser,
	attachCookiesToResponse,
	checkPermissions,
} = require("../utils");

// GET ALL USERS
const getAllUsers = async (req, res) => {
	// console.log(req.user);
	// { name: 'siangyin', userID: '6206712bc2255c8b3f6f946b', role: 'user' }
	const users = await User.find({ role: "user" }).select("-password");
	res.status(StatusCodes.OK).json({ users });
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select("-password");
	if (!user) {
		throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
	}
	checkPermissions(req.user, user._id);
	res.status(StatusCodes.OK).json({ user });
};

// SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userID }).select("-password");
	if (!user) {
		throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
	}
	res.status(StatusCodes.OK).json({ user });
};

// need to be able to update personal info > to be continue
// UPDATE USER eg deactivated acct/ update detail
const updateUser = async (req, res) => {
	const { email, name } = req.body;
	console.log(req.user);
	if (!email || !name) {
		throw new CustomError.BadRequestError("Please provide all values");
	}
	const user = await User.findOne({ _id: req.user.userID });

	user.email = email;
	user.name = name;

	await user.save();

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};

// UPDATE USER PASSWORD
const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	console.log(req.user);
	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError("Please provide both values");
	}

	const user = await User.findOne({ _id: req.user.userID });

	const isPasswordCorrect = await user.comparePassword(oldPassword);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError("Invalid Credentials");
	}
	user.password = newPassword;

	await user.save();
	res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};

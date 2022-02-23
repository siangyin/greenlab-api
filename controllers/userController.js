const User = require("../models/User");
const Address = require("../models/Address");
const Order = require("../models/Order");
const CartItem = require("../models/CartItem");
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
	res.status(StatusCodes.OK).json({ status: "OK", data: users });
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select("-password");
	if (!user) {
		throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
	}
	// checkPermissions(req.user, user._id);

	const address = await Address.findOne({ userId: req.params.id });
	const order = await Order.findOne({ userId: req.params.id }).populate(
		"orderItems"
	);

	res.status(StatusCodes.OK).json({ status: "OK", user, address, order });
};

// SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
	const { userId } = req.query;
	const user = await User.findOne({ _id: userId }).select("-password");

	if (!user) {
		throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
	}

	const address = await Address.findOne({ userId });
	const order = await Order.findOne({ userId }).populate("orderItems");

	res.status(StatusCodes.OK).json({ status: "OK", user, address, order });
};

// need to be able to update personal info > to be continue
// UPDATE USER eg deactivated acct/ update detail
const updateUser = async (req, res) => {
	const {
		body: { name, email, address },
		params: { id: userID },
	} = req;
	console.log(req.user);
	if (name === "" && email === "" && address === "") {
		throw new CustomError.BadRequestError("Please provide values");
	}
	let user;
	if (name || email) {
		user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
			new: true,
			runValidators: true,
		});
	}

	let updateUserAdd;
	if (address) {
		const findAdd = await Address.findOne({ userId: userID });
		if (findAdd) {
			updateUserAdd = await Address.findByIdAndUpdate(
				{ _id: findAdd._id },
				{ ...address, userId: userID },
				{
					new: true,
					runValidators: true,
				}
			);
		} else {
			updateUserAdd = await Address.create({ ...address, userId: userID });
		}
	}

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res
		.status(StatusCodes.OK)
		.json({ user: tokenUser, status: "OK", data: updateUserAdd });
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
	res
		.status(StatusCodes.OK)
		.json({ status: "OK", msg: "Success! Password Updated." });
};

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};

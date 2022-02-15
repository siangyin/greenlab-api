const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// GET ALL USERS
const getAllUsers = async (req, res) => {
	res.send("getAllUsers");
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
	res.send("getSingleUser");
};

// SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
	res.send("showCurrentUser");
};

// UPDATE USER eg deactivated acct/ update detail
const updateUser = async (req, res) => {
	res.send("updateUser");
};

// UPDATE USER PASSWORD
const updateUserPassword = async (req, res) => {
	res.send("updateUserPassword");
};

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};

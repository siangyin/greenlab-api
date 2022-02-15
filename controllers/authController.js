const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// REGISTER
const register = async (req, res) => {
	res.send("register");
};

// LOGIN
const login = async (req, res) => {
	res.send("login");
};

// LOGOUT
const logout = async (req, res) => {
	res.send("logout");
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

const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// CREATE ORDER
const createOrder = async (req, res) => {
	res.send("createOrder");
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
	res.send("getAllOrders");
};

// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
	res.send("getSingleOrder");
};

// GET CURRENT USER ORDER
const getCurrentUserOrders = async (req, res) => {
	res.send("getCurrentUserOrders");
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
	res.send("updateOrder");
};

module.exports = {
	createOrder,
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
};

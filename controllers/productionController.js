const User = require("../models/User");
const Address = require("../models/Address");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Review = require("../models/Review");
const CartItem = require("../models/CartItem");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const deleteAllDB = async (req, res) => {
	try {
		await User.findOneAndRemove({ role: "user" });
		await Address.deleteMany();
		await Order.deleteMany();
		await Product.deleteMany();
		await Review.deleteMany();
		await CartItem.deleteMany();
		res.status(StatusCodes.OK).json({ msg: "all db cleared" });
	} catch (error) {
		console.log(error);
	}
};

module.exports = deleteAllDB;

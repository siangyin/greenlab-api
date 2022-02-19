const User = require("../models/User");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// createCartItem,
// getAllCartItems,
// getSingleCartItem,
// getCurrentUserCartItems,
// updateCartItem,
// deleteCartItem

const createCartItem = async (req, res) => {
	// for query path is ?key=value
	// eg http://localhost:5000/api/carts?productId=123&qty=5&userId=321
	// req.query return object so can directly pass in .find(obj)

	const { productId, qty, userId } = req.query;
	console.log(req.query);
	console.log(req.body);
	const queryObj = { qty: qty };
	let product;
	if (userId) {
		queryObj.userId = userId;
	}

	if (productId) {
		product = await Product.findOne({ _id: productId });
		queryObj.productId = product._id;
		queryObj.name = product.name;
		queryObj.image = product.image;
		queryObj.price = product.price;
	}

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}

	const cart = await CartItem.create(queryObj);
	res.status(StatusCodes.CREATED).json(cart);
};

const getAllCartItems = async (req, res) => {
	res.send("getAllCartItems");
};

const getSingleCartItem = async (req, res) => {
	res.send("getSingleCartItem");
};

const getCurrentUserCartItems = async (req, res) => {
	res.send("getCurrentUserCartItems");
};

const updateCartItem = async (req, res) => {
	res.send("updateCartItem");
};

const deleteCartItem = async (req, res) => {
	res.send("deleteCartItem");
};

module.exports = {
	createCartItem,
	getAllCartItems,
	getSingleCartItem,
	getCurrentUserCartItems,
	updateCartItem,
	deleteCartItem,
};

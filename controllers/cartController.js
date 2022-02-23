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

	let queryObj = {};
	const { productId, qty, userId } = req.body;

	if (!productId || !qty) {
		throw new CustomError.NotFoundError(`Must provide productId and qty`);
	}

	let product = await Product.findOne({ _id: productId });

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}

	queryObj.name = product.name;
	queryObj.image = product.image;
	queryObj.price = product.price;

	let cart;

	// else, mean have userId, check if same user have same item in cart db.
	cart = await CartItem.findOne({
		userId: userId,
		productId: product._id,
		status: false,
	});

	if (cart) {
		// update cart
		queryObj.qty = Number(cart.qty) + Number(qty);

		const updatedcart = await CartItem.findOneAndUpdate(
			{ _id: cart._id },
			{ ...queryObj, productId: product._id, userId: cart.userId },
			{
				new: true,
				runValidators: true,
			}
		);

		const updatedcarts = await CartItem.find({
			userId: userId,
			status: false,
		});

		return res
			.status(StatusCodes.CREATED)
			.json({ status: "OK", data: updatedcarts });
	}

	queryObj.qty = Number(qty);
	cart = await CartItem.create({
		...queryObj,
		productId: product._id,
		userId: userId,
	});

	const updatedcarts = await CartItem.find({
		userId: userId,
		status: false,
	});

	return res
		.status(StatusCodes.CREATED)
		.json({ status: "OK", data: updatedcarts });
};

const getAllCartItems = async (req, res) => {
	const carts = await CartItem.find({});

	return res
		.status(StatusCodes.OK)
		.json({ status: "OK", count: carts.length, data: carts });
};

const getSingleCartItem = async (req, res) => {
	const { id } = req.params;

	const cart = await CartItem.findOne({ _id: id });

	if (!cart) {
		throw new CustomError.NotFoundError(`No cart with id : ${id}`);
	}
	return res.status(StatusCodes.OK).json({ status: "OK", data: cart });
};

const getCurrentUserCartItems = async (req, res) => {
	const { userId } = req.query;
	const user = await User.findOne({ _id: userId }).select("-password");
	// console.log(req.user); //{ name: 'kookooo', userID: '620d312869493e2df5937863', role: 'admin' }
	const carts = await CartItem.find({ userId: userId });
	return res
		.status(StatusCodes.OK)
		.json({ status: "OK", user: user, count: carts.length, data: carts });
};

const updateCartItem = async (req, res) => {
	const {
		body: { qty },
		params: { id: cartID },
	} = req;

	if (!cartID || !qty) {
		throw new CustomError.BadRequestError("Please provide values");
	}

	// check latest cart & product info
	const cart = await CartItem.findOne({ _id: cartID });
	const product = await Product.findOne({ _id: cart.productId });

	if (!product) {
		throw new CustomError.BadRequestError("Product not available");
	}

	const queryObj = {
		name: product.name,
		image: product.image,
		price: product.price,
		qty: Number(qty),
		productId: product._id,
	};

	// update cart item
	const updatedcart = await CartItem.findByIdAndUpdate(
		{ _id: cartID },
		queryObj,
		{
			new: true,
			runValidators: true,
		}
	);

	return res.status(StatusCodes.OK).json({ status: "OK", data: updatedcart });
};

const deleteCartItem = async (req, res) => {
	const cart = await CartItem.findOne({ _id: req.params.id });

	if (!cart) {
		throw new CustomError.NotFoundError(`No cart with id : ${req.params.id}`);
	}

	await cart.remove();
	res
		.status(StatusCodes.OK)
		.json({ status: "OK", msg: "Success! Cart item removed." });
};

module.exports = {
	createCartItem,
	getAllCartItems,
	getSingleCartItem,
	getCurrentUserCartItems,
	updateCartItem,
	deleteCartItem,
};

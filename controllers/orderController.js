const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
	const client_secret = "someRandomValue";
	return { client_secret, amount };
};

// CREATE ORDER
const createOrder = async (req, res) => {
	const { items: cartItems, tax, shippingFee } = req.body;

	if (!cartItems || cartItems.length < 1) {
		throw new CustomError.BadRequestError("No cart items provided");
	}
	if (!shippingFee) {
		throw new CustomError.BadRequestError("Please provide shipping fee");
	}

	let orderItems = [];
	let subtotal = 0;

	for (const item of cartItems) {
		const dbProduct = await Product.findOne({ _id: item.product });
		if (!dbProduct) {
			throw new CustomError.NotFoundError(
				`No product with id : ${item.product}`
			);
		}
		const { name, price, image, _id } = dbProduct;
		const singleOrderItem = {
			qty: item.qty,
			name,
			price,
			image,
			product: _id,
		};
		// add item to order
		orderItems = [...orderItems, singleOrderItem];
		// calculate subtotal
		subtotal += item.qty * price;
	}
	// calculate total
	const total = tax + shippingFee + subtotal;
	// get client secret
	const paymentIntent = await fakeStripeAPI({
		amount: total,
		currency: "sgd",
	});

	const order = await Order.create({
		orderItems,
		total,
		subtotal,
		shippingFee,
		clientSecret: paymentIntent.client_secret,
		user: req.user.userID,
	});

	res
		.status(StatusCodes.CREATED)
		.json({ order, clientSecret: order.clientSecret });
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

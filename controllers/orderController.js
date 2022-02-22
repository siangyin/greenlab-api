const Order = require("../models/Order");
const Product = require("../models/Product");
const Address = require("../models/Address");
const CartItem = require("../models/CartItem");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
	const client_secret = "someRandomValue";
	return { client_secret, amount };
};

// CREATE ORDER
const createOrder = async (req, res) => {
	const { orderItems: cartItems, shippingFee, address } = req.body;

	if (!cartItems || cartItems.length < 1) {
		throw new CustomError.BadRequestError("No cart items provided");
	}

	let orderItems = [];
	let subtotal = 0;

	for (const idx of cartItems) {
		const cartDB = await CartItem.findByIdAndUpdate(
			{ _id: idx },
			{ status: true },
			{
				new: true,
				runValidators: true,
			}
		);
		if (!cartDB) {
			throw new CustomError.NotFoundError(`No cart data with id : ${idx}`);
		}
		const productDB = await Product.findOne({ _id: cartDB.productId });

		// add item to order
		orderItems = [...orderItems, cartDB._id];
		// calculate subtotal
		subtotal += Number(cartDB.qty) * Number(productDB.price);
	}
	// calculate total
	const total = Number(shippingFee) + subtotal;
	// get client secret
	const paymentIntent = await fakeStripeAPI({
		amount: total,
		currency: "sgd",
	});

	const addresscheck = await Address.findOne({ _id: address });
	if (!addresscheck) {
		throw new CustomError.NotFoundError(`No address data with id : ${address}`);
	}

	const order = await Order.create({
		orderItems,
		total,
		subtotal,
		shippingFee,
		clientSecret: paymentIntent.client_secret,
		userId: req.user.userID,
		address: addresscheck._id,
	});

	for (const eachcart of orderItems) {
		const updateCart = await CartItem.findByIdAndUpdate(
			{ _id: eachcart },
			{ orderId: order._id },
			{
				new: true,
				runValidators: true,
			}
		);
	}

	return res
		.status(StatusCodes.CREATED)
		.json({ status: "OK", data: order, clientSecret: order.clientSecret });
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
	const orders = await Order.find({});
	return res
		.status(StatusCodes.OK)
		.json({ status: "OK", count: orders.length, data: orders });
};

// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
	const { id: orderId } = req.params;
	const order = await Order.findOne({ _id: orderId });
	if (!order) {
		throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
	}
	checkPermissions(req.user, order.user);
	console.log(req.user);
	console.log(order.user);
	res.status(StatusCodes.OK).json({ status: "OK", data: order });
};

// GET CURRENT USER ORDER
const getCurrentUserOrders = async (req, res) => {
	const orders = await Order.find({ user: req.user.userID });
	res
		.status(StatusCodes.OK)
		.json({ status: "OK",count: orders.length,  data: orders });
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
	const { id: orderId } = req.params;

	let order = await Order.findOne({ _id: orderId });
	if (!order) {
		throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
	}
	checkPermissions(req.user, order.user);

	order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(StatusCodes.OK).json({ status: "OK", data: order });
};

module.exports = {
	createOrder,
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
};

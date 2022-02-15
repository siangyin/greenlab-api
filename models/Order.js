const mongoose = require("mongoose");

const SingleOrderItemSchema = mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	amount: { type: Number, required: true },
	productId: {
		type: mongoose.Schema.ObjectId,
		ref: "Product",
		required: true,
	},
});

const OrderSchema = mongoose.Schema(
	{
		orderItems: [SingleOrderItemSchema],
		shippingFee: {
			type: Number,
			required: true,
		},
		subtotal: {
			type: Number,
			required: true,
		},
		total: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: [
				"pending",
				"processing",
				"failed",
				"paid",
				"delivered",
				"canceled",
			],
			default: "pending",
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		clientSecret: {
			type: String,
			required: true,
		},
		paymentIntentId: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

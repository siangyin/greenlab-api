const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
	{
		orderItems: [
			{ type: mongoose.Schema.ObjectId, ref: "CartItem", required: true },
		],
		shippingFee: {
			type: Number,
			required: true,
			default: 10,
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
		address: {
			type: mongoose.Schema.ObjectId,
			ref: "Address",
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

const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number, required: true },
		qty: { type: Number, required: true },
		status: {
			type: Boolean,
			default: false,
		},
		orderId: {
			type: mongoose.Schema.ObjectId,
			ref: "Order",
		},
		productId: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
			required: true,
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);

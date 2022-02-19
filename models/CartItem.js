const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		price: { type: Number, required: true },
		qty: { type: Number, required: true },
		productId: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
			required: false,
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);

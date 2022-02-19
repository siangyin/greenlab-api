const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "Please provide product name"],
		maxlength: [150, "Name can not be more than 150 characters"],
	},
	price: {
		type: Number,
		required: [true, "Please provide product price"],
		default: 0,
	},
	promo: {
		type: Number,
	},
	description: {
		type: String,
		trim: true,
	},
	image: {
		type: String,
		trim: true,
		default:
			"https://txspicenmore.com/wp-content/uploads/2019/12/no-product.png",
	},
	category: {
		type: String,
		required: [true, "Please provide product category"],
		enum: ["plants", "accessory", "supplies", "services"],
	},
	status: {
		type: Boolean,
		default: false,
	},
	// stockQty: {
	// 	type: Number,
	// 	required: true,
	// 	default: 15,
	// },
	tags: [String],
	averageRating: {
		type: Number,
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: [true, "Please provide user"],
	},
});

module.exports = mongoose.model("Product", ProductSchema);

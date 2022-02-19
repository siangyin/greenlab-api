const mongoose = require("mongoose");

// const ImageSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	imgUrl: {
// 		type: String,
// 		trim: true,
// 		default:
// 			"https://www.gemkom.com.tr/wp-content/uploads/2020/02/NO_IMG_600x600-1.png",
// 	},
// });

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
	promoPrice: {
		type: Number,
	},
	description: {
		type: String,
		required: [true, "Please provide product description"],
		maxlength: [1000, "Description can not be more than 1000 characters"],
	},
	image: {
		type: String,
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

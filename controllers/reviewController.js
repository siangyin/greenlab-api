const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

// CREATE REVIEW
const createReview = async (req, res) => {
	const { productId } = req.body;
	const isValidProduct = await Product.find({ _id: productId });
	console.log(productId);
	if (!isValidProduct) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}
	req.body.userId = req.user.userID;
	const alreadySubmitted = await Review.find({
		productId: productId,
		userId: req.user.userID,
	});
	console.log(alreadySubmitted);
	if (alreadySubmitted) {
		throw new CustomError.BadRequestError(
			"User already submitted review for this product"
		);
	}
	console.log({
		...req.body,
		productId: productId,
		userId: req.user.userID,
	});
	const review = await Review.create({
		...req.body,
		productId: isValidProduct._id,
		userId: req.user.userID,
	});
	return res.status(StatusCodes.CREATED).json(review);
};

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
	res.send("getAllReviews");
};

// GET SINGLE REVIEW
const getSingleReview = async (req, res) => {
	res.send("getSingleReview");
};

// GET SINGLE PRODUCT REVIEWS
const getSingleProductReviews = async (req, res) => {
	res.send("getSingleProductReviews");
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
	res.send("updateReview");
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
	res.send("deleteReview");
};

module.exports = {
	createReview,
	getAllReviews,
	getSingleReview,
	getSingleProductReviews,
	updateReview,
	deleteReview,
};

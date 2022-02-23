const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

// CREATE REVIEW
const createReview = async (req, res) => {
	const { userId } = req.query;
	const { product: productId } = req.body;

	const isValidProduct = await Product.findOne({ _id: productId });

	if (!isValidProduct) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}

	const alreadySubmitted = await Review.findOne({
		product: productId,
		user: userId,
	});

	if (alreadySubmitted) {
		throw new CustomError.BadRequestError(
			"Already submitted review for this product"
		);
	}

	req.body.user = userId;

	const review = await Review.create(req.body);
	res.status(StatusCodes.CREATED).json({ status: "OK", data: review });
};

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
	const reviews = await Review.find({})
		.populate({
			path: "product",
			select: "category name averageRating numOfReviews",
		})
		.populate({ path: "user", select: "name" });

	res
		.status(StatusCodes.OK)
		.json({ status: "OK", count: reviews.length, data: reviews });
};

// GET SINGLE REVIEW
const getSingleReview = async (req, res) => {
	const { id: reviewId } = req.params;

	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
	}

	res.status(StatusCodes.OK).json({ status: "OK", data: review });
};

// GET SINGLE PRODUCT REVIEWS
const getSingleProductReviews = async (req, res) => {
	const { id: productId } = req.params;
	const reviews = await Review.find({ product: productId });
	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const { rating, title, comment } = req.body;

	const review = await Review.findById(reviewId);
	// console.log(review);
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
	}
	// console.log(req.user.role);
	// console.log(review.user);
	// checkPermissions(req.user, review.user);

	review.rating = rating;
	review.title = title;
	review.comment = comment;

	await review.save();
	res.status(StatusCodes.OK).json({ status: "OK", data: review });
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params;

	const review = await Review.findOne({ _id: reviewId });

	if (!review) {
		throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
	}

	// checkPermissions(req.user, review.user);
	await review.remove();
	res
		.status(StatusCodes.OK)
		.json({ status: "OK", msg: "Success! Review removed" });
};

module.exports = {
	createReview,
	getAllReviews,
	getSingleReview,
	getSingleProductReviews,
	updateReview,
	deleteReview,
};

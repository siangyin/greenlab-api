const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// CREATE REVIEW
const createReview = async (req, res) => {
	res.send("createReview");
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

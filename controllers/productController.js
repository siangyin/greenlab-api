const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// CREATE PRODUCT
const createProduct = async (req, res) => {
	res.send("createProduct");
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
	res.send("getAllProducts");
};

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
	res.send("getSingleProduct");
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
	res.send("updateProduct");
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
	res.send("deleteProduct");
};

module.exports = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
};

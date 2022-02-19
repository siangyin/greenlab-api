const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// CREATE PRODUCT
const createProduct = async (req, res) => {
	req.body.createdBy = req.user.userID;
	const product = await Product.create(req.body);
	res.status(StatusCodes.CREATED).json({ product });
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(StatusCodes.OK).json({ products, count: products.length });
};

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
	const { id: productId } = req.params;

	const product = await Product.findOne({ _id: productId });
	// .populate("reviews");

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}
	res.status(StatusCodes.OK).json({ product });
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
	const { id: productId } = req.params;

	const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}

	res.status(StatusCodes.OK).json({ product });
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
	const { id: productId } = req.params;

	const product = await Product.findOne({ _id: productId });

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}

	await product.remove();
	res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

// const uploadImage = async (req, res) => {
// 	// console.log(req.files);
// 	if (!req.files) {
// 		throw new CustomError.BadRequestError("No File Uploaded");
// 	}
// 	const productImage = req.files.image;

// 	if (!productImage.mimetype.startsWith("image")) {
// 		throw new CustomError.BadRequestError("Please Upload Image");
// 	}

// 	const maxSize = 1024 * 1024;

// 	if (productImage.size > maxSize) {
// 		throw new CustomError.BadRequestError(
// 			"Please upload image smaller than 1MB"
// 		);
// 	}

// 	const imagePath = path.join(
// 		__dirname,
// 		"../public/uploads/" + `${productImage.name}`
// 	);
// 	await productImage.mv(imagePath);
// 	res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
// };

const uploadImage = async (req, res) => {
	const { id: productId } = req.params;
	let product = await Product.findOne({ _id: productId });

	if (!product) {
		throw new CustomError.NotFoundError(`No product with id : ${productId}`);
	}

	// console.log(req);
	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{
			use_filename: true,
			folder: "04-Greenlab-IMG",
		}
	);
	console.log(result);
	// remove the temp file
	fs.unlinkSync(req.files.image.tempFilePath);

	product = await Product.findOneAndUpdate(
		{ _id: productId },
		{ image: result.secure_url },
		{
			new: true,
			runValidators: true,
		}
	);

	return res.status(StatusCodes.OK).json(product);
};

module.exports = {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	uploadImage,
};

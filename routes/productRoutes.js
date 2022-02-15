const express = require("express");
const router = express.Router();

const { getSingleProductReviews } = require("../controllers/reviewController");
const {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");

router.route("/").post(createProduct).get(getAllProducts);
router
	.route("/:id")
	.get(getSingleProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;

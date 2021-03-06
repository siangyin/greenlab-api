const express = require("express");
const router = express.Router();

const { getSingleProductReviews } = require("../controllers/reviewController");
const {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	uploadImage,
	deleteProduct,
} = require("../controllers/productController");

const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

// router
// 	.route("/")
// 	.post([authenticateUser, authorizePermissions("admin")], createProduct)
// 	.get(getAllProducts);

// router
// 	.route("/:id")
// 	.get(getSingleProduct)
// 	.patch([authenticateUser, authorizePermissions("admin")], updateProduct)
// 	.delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

// router
// 	.route("/:id/uploadimage")
// 	.post([authenticateUser, authorizePermissions("admin")], uploadImage);

router.route("/").post(createProduct).get(getAllProducts);
router
	.route("/:id")
	.get(getSingleProduct)
	.patch(updateProduct)
	.delete(deleteProduct);
router.route("/:id/uploadimage").post(uploadImage);
router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;

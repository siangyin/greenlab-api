const express = require("express");
const router = express.Router();

const {
	createCartItem,
	getAllCartItems,
	getSingleCartItem,
	getCurrentUserCartItems,
	updateCartItem,
	deleteCartItem,
} = require("../controllers/cartController");

const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

router.route("/").post(createCartItem).get(getCurrentUserCartItems);
router
	.route("/all-items")
	.get([authenticateUser, authorizePermissions("admin")], getAllCartItems);

router
	.route("/:id")
	.get(getSingleCartItem)
	.patch(updateCartItem)
	.delete(deleteCartItem);

module.exports = router;

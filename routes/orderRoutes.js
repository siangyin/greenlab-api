const express = require("express");
const router = express.Router();

const {
	createOrder,
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
} = require("../controllers/orderController");

const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

router;
// 	.route("/")
// 	.post(authenticateUser, createOrder)
// 	.get([authenticateUser, authorizePermissions("admin")], getAllOrders);

// router.route("/myorders").get(authenticateUser, getCurrentUserOrders);

// router
// 	.route("/:id")
// 	.get(authenticateUser, getSingleOrder)
// 	.patch(authenticateUser, updateOrder);

router.route("/").post(createOrder).get(getAllOrders);
router.route("/myorders").get(getCurrentUserOrders);
router.route("/:id").get(getSingleOrder).patch(updateOrder);

module.exports = router;

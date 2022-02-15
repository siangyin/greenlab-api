const express = require("express");
const router = express.Router();

const {
	createOrder,
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	updateOrder,
} = require("../controllers/orderController");

router.route("/").post(createOrder).get(getAllOrders);

router.route("/myorders").get(getCurrentUserOrders);

router.route("/:id").get(getSingleOrder).patch(updateOrder);

module.exports = router;

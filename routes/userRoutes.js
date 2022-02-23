const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} = require("../controllers/userController");

const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

// router
// 	.route("/")
// 	.get([authenticateUser, authorizePermissions("admin")], getAllUsers);
// router.route("/myacct").get(authenticateUser, showCurrentUser);
// router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
// router
// 	.route("/:id")
// 	.get(authenticateUser, getSingleUser)
// 	.patch(authenticateUser, updateUser);

router.route("/").get(getAllUsers);
router.route("/myacct").get(showCurrentUser);
router.route("/updateUserPassword").patch(updateUserPassword);
router.route("/:id").get(getSingleUser).patch(updateUser);

module.exports = router;

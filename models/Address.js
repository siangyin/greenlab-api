const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AddressSchema = mongoose.Schema({
	name: { type: String },
	contact: { type: Number },
	address: { type: String },
	postalcode: { type: Number },
	remark: { type: String },
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Address", AddressSchema);

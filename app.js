require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connectDB");

app.get("/", (req, res) => {
	res.send("Hello");
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(PORT, console.log(`server is on port ${PORT}`));
	} catch (error) {}
};

start();

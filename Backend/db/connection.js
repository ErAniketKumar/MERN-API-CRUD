const express = require("express");
const mongoose = require("mongoose");

async function run(uri) {

	const dbOptions = {
		dbName: "crudApi",
	};
	try {
		await mongoose.connect(uri, dbOptions);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.log(err);
	}
}

module.exports = run;

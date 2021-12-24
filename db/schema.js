const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: String,
});
const listOfItemsSchema = new mongoose.Schema({
	name: String,
	model: itemSchema,
});

module.exports = {
	itemSchema,
	listOfItemsSchema,
};

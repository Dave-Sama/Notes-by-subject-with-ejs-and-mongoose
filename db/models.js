const mongoose = require('mongoose');
const { itemSchema, listOfItemsSchema } = require('./schema');

const Item = mongoose.model('Item', itemSchema);
const listOfItems = mongoose.model('ListOfItems', listOfItemsSchema);


const models = {
	List: listOfItems,
	Item: Item,
};

module.exports = { models };

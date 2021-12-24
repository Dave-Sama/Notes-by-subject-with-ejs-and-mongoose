const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db/mongoConnect');
const date = require(__dirname + '/date.js');
const _ = require('lodash');
const {
	AddItem,
	AddItems,
	FindAll,
	UpdateItem,
	DeleteOne,
	DeleteMany,
	FindOne,
} = require('./db/CRUD');
const { models } = require('./db/models');
require('dotenv').config();
// const data = require('./data');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	models.List.find({ name: 'Todos' }, (err, result) => {
		if (err) {
			console.log(err);
			res.render('list', { listTitle: 'Something went wrong.', newItem: [] });
		} else {
			res.render('list', { listTitle: 'Todos', newItem: result });
		}
	});
});

app.get('/:customListName', (req, res) => {
	const customListName = _.capitalize(req.params.customListName);
	models.List.find({ name: customListName }, (err, result) => {
		if (err) {
			console.log('Something went wrong...');
		} else {
			if (result.length === 0) {
				const newItem = new models.Item({ name: 'New list' });
				AddItem(newItem);
				AddItem(new models.List({ name: customListName, model: newItem }));
				res.redirect('/' + _.lowerCase(customListName));
			} else {
				res.render('list', { listTitle: customListName, newItem: result });
			}
		}
	});
});

app.get('/about', (req, res) => {
	res.render('about', { newItem: workItems, listTitle: 'About List' });
});

// // add to todo list.
app.post('/', (req, res) => {
	const { add, type } = req.body;
	console.log(req.body);

	// create an object and add it to the list
	const newItem = new models.Item({ name: add });
	AddItem(newItem);
	AddItem(new models.List({ name: type, model: newItem }));

	// redirect the path
	if (type == 'Todos') {
		res.redirect('/');
	} else {
		res.redirect('/' + _.lowerCase(type));
	}
});

// Delete from the "List" by retrieving a specific _id from the HTML file
app.post('/delete', (req, res) => {
	const { value, type } = req.body;
	DeleteOne(models.List, value);
	if (type == 'Todos') {
		res.redirect('/');
	} else {
		res.redirect('/' + _.lowerCase(type));
	}
});

const port = process.env.PORT || 3000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();

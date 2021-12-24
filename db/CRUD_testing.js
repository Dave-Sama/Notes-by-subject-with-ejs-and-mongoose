const {
	AddItem,
	AddItems,
	FindAll,
	UpdateItem,
	DeleteOne,
	DeleteMany,
} = require('./CRUD');

const { Fruit, Person } = require('./models');
// Testing the functionality of CRUD basic operations
AddItem(
	new Person({
		name: 'Mike',
		age: 34,
		proffesion: 'Lock Picker.',
	}),
	people
);

UpdateItem(Person, '61c31ea00abc439d44649cf9', { name: 'Dickenson' });

DeleteOne(Person, '61c31ea00abc439d44649cf9');

AddItems(
	[
		new Person({
			name: 'Aaron',
			age: 28,
			proffesion: 'Painter.',
		}),
		new Person({
			name: 'Beni',
			age: 90,
			proffesion: 'Lecturer.',
		}),
		new Person({
			name: 'Sami',
			age: 10,
			proffesion: 'Fire Fighter.',
		}),
	],
	Person
);

// DeleteMany(Person, { name: 'Beni' });

FindAll(Person);

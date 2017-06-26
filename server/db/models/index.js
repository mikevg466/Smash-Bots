const db = require('../db');
const User = require('./user');
const Item = require('./item');

 User.hasMany(Item)


module.exports = {
	db,
	User,
	Item
};

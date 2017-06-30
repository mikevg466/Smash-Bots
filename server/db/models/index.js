const db = require('../db');
const User = require('./user');
const Item = require('./item');

User.belongsToMany(Item, { through: 'purchased_items' });
User.hasOne(Item, { as: 'weapon' });
User.hasOne(Item, { as: 'armor' });


module.exports = {
	db,
	User,
	Item
};

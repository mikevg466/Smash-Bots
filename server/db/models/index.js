const db = require('../db');
const User = require('./user');
const Item = require('./item');

User.belongsTo(Item, { as: 'weapon' });
User.belongsTo(Item, { as: 'armor' });
User.belongsToMany(Item, { through: 'purchased_items' });

module.exports = {
	db,
	User,
	Item
};

const db = require('../db');
const User = require('./user');
const Item = require('./item');

User.hasOne(Item, { as: 'weapon' });
User.belongsToMany(Item, { through: 'purchased_items' });
Item.belongsToMany(User, { through: 'purchased_items' });

User.hasOne(Item, { as: 'armor' });


module.exports = {
	db,
	User,
	Item
};

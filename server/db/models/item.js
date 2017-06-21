const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  graphic: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{ });

module.exports = Item;

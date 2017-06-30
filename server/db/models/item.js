const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  graphic: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  power: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  unlockLevel: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Item;

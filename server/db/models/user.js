const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
};

const User = db.define('user', {
  name: {
    type: Sequelize.STRING(32)
  },
  type: {
    type: Sequelize.ENUM('ADMIN','BASIC'),
    defaultValue: 'BASIC'
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING
  },
  password_reset: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  instanceMethods: {
    correctPassword (candidatePwd) {
      return this.Model.encryptPassword(candidatePwd, this.salt) === this.password;
    }
  },
  classMethods: {
    generateSalt () {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword (plainText, salt) {
      return crypto.createHash('sha1').update(plainText).update(salt).digest('hex');
    }
  },
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

module.exports = User;

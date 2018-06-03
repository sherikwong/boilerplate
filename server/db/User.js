const Sequelize = require('sequelize');

const db = require('./db');

const User = db.define('user', {
  // what fields will we need?
  // make sure that the password we store is salted and hashed! NEVER store the plain password
  password: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  // should return true or false for if the entered password matches
  return candidatePassword === this.password;
};

// class methods
User.generateSalt = function () {
  // this should generate our random salt
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};


String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

User.encryptPassword = function (plainText, salt) {
  // accepts a plain text password and a salt, and returns its hash
  return salt + plainText.hashCode();
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (this.password === null) { // Only covers when there is a password for the first time... How do you do it again when they change it?
    user.encryptPassword(user.password, );
  }
}

module.exports = User;

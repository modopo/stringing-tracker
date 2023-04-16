'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'rackets';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    role: {type: DataTypes.ENUM('user', 'admin'), required: true, defaultValue: 'user' },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read', 'create'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    }
  })
}
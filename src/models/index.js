'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const DB_CONNECTION = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DB_CONNECTION);

module.exports = {
  db: sequelize,
}
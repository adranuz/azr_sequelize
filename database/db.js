const { Sequelize } = require('sequelize');
const { database: db } = require('../config');

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
  `${db.dialect}://${db.user}:${db.pass}@${db.host}:${db.port}/${db.dbname}`
  ) // Example for postgres


module.exports = sequelize;
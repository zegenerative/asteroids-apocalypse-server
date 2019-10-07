const Sequelize = require('sequelize');

const databaseUrl =
  process.env.DATABASE_URL ||
  'postgres://postgres:password@localhost:5432/postgres';

console.log('database_url:', process.env.DATABASE_URL);

const db = new Sequelize(databaseUrl);

db.sync({ force: false })
  .then(() => console.log('Database successfully created'))
  .catch(console.error);

module.exports = db;

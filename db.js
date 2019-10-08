const Sequelize = require('sequelize');

const databaseUrl =
  'postgres://wzwfkstvwmsivs:a8df2de51a1d5f46bf6c1c04d8a31e8ad1fab6fe89e8609859916f4d24c079e3@ec2-54-217-206-65.eu-west-1.compute.amazonaws.com:5432/dc6j020hjsb0m2' ||
  'postgres://postgres:password@localhost:5432/postgres';

console.log('database_url:', process.env.DATABASE_URL);

const db = new Sequelize(databaseUrl);

db.sync({ force: true })
  .then(() => console.log('Database successfully created'))
  .catch(console.error);

module.exports = db;

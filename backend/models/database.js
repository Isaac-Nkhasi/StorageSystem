// models/database.js
const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Neon requires SSL
});

module.exports = db;

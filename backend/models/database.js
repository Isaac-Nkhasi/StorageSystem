// models/database.js
const { Pool } = require('pg');
require('dotenv').config();

// Use DATABASE_URL from Render/Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // required for Neon
    },
});

module.exports = {
    query: async (text, params) => {
        const client = await pool.connect();
        try {
            const res = await client.query(text, params);
            return res.rows;
        } finally {
            client.release();
        }
    },
};

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const attendanceRoutes = require('./routes/attendance');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Add new attendance record
router.post('/', async (req, res) => {
    try {
        const { employeeName, employeeID, date, status } = req.body;
        
        // Validate required fields
        if (!employeeName || !employeeID || !date || !status) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Validate status
        if (!['Present', 'Absent'].includes(status)) {
            return res.status(400).json({ error: 'Status must be either Present or Absent' });
        }

        const result = await db.query(
            'INSERT INTO attendance (employee_name, employee_id, date, status) VALUES (?, ?, ?, ?)',
            [employeeName, employeeID, date, status]
        );

        res.status(201).json({ id: result.insertId, employee_name: employeeName, employee_id: employeeID, date, status });
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all attendance records
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM attendance ORDER BY date DESC');
        res.json(result);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete attendance record
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM attendance WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Attendance record not found' });
        }

        res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
import React, { useState } from 'react';
import { addAttendance } from '../services/api';

const AttendanceForm = ({ onAttendanceAdded }) => {
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeID: '',
        date: '',
        status: 'Present'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await addAttendance(formData);
            setSuccess('Attendance recorded successfully!');
            setFormData({
                employeeName: '',
                employeeID: '',
                date: '',
                status: 'Present'
            });
            if (onAttendanceAdded) {
                onAttendanceAdded();
            }
        } catch (error) {
            setError(error.message || 'Failed to record attendance');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Record Attendance</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="employeeName" className="form-label">Employee Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employeeName"
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employeeID" className="form-label">Employee ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employeeID"
                            name="employeeID"
                            value={formData.employeeID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Recording...' : 'Record Attendance'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AttendanceForm;
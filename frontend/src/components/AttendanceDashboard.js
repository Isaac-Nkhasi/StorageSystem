import React, { useState, useEffect } from 'react';
import { getAttendance, deleteAttendance } from '../services/api';

const AttendanceDashboard = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const fetchAttendance = async () => {
        try {
            const data = await getAttendance();
            setAttendance(data);
            setError('');
        } catch (error) {
            setError('Failed to fetch attendance records');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await deleteAttendance(id);
                fetchAttendance();
            } catch (error) {
                setError('Failed to delete record');
            }
        }
    };

    const filteredAttendance = attendance.filter(record => {
        const matchesSearch = 
            record.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = dateFilter ? record.date.includes(dateFilter) : true;
        return matchesSearch && matchesDate;
    });

    if (loading) return <div>Loading...</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Attendance Records</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="date"
                            className="form-control"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Employee ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.employee_name}</td>
                                    <td>{record.employee_id}</td>
                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge ${record.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceDashboard;
import axios from 'axios';

// Use Render backend URL in production
const API_URL = process.env.REACT_APP_API_URL || 'https://storagesystem-1.onrender.com/api/attendance';

export const addAttendance = async (attendanceData) => {
    try {
        // Map frontend fields to backend fields
        const payload = {
            employeeName: attendanceData.employeeName,
            employeeID: attendanceData.employeeID,
            date: attendanceData.date,
            status: attendanceData.status
        };

        const response = await axios.post(API_URL, payload);
        return response.data;
    } catch (error) {
        console.error('Attendance API error:', error.response || error.message);
        throw error.response?.data || { error: 'Failed to record attendance' };
    }
};

export const getAttendance = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Attendance API error:', error.response || error.message);
        throw error.response?.data || { error: 'Failed to fetch attendance' };
    }
};

export const deleteAttendance = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Attendance API error:', error.response || error.message);
        throw error.response?.data || { error: 'Failed to delete attendance' };
    }
};

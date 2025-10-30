import axios from 'axios';

// Use Render backend URL in production
const API_URL =
  process.env.REACT_APP_API_URL || 'https://storagesystem-1.onrender.com/api';

// Send attendance exactly as backend expects
export const addAttendance = async ({ employeeName, employeeID, date, status }) => {
    try {
        const payload = { employeeName, employeeID, date, status };
        const response = await axios.post(`${API_URL}/attendance`, payload);
        return response.data;
    } catch (error) {
        console.error('Attendance API error:', error);
        throw error.response?.data || error.message;
    }
};

export const getAttendance = async () => {
    try {
        const response = await axios.get(`${API_URL}/attendance`);
        return response.data;
    } catch (error) {
        console.error('Attendance API error:', error);
        throw error.response?.data || error.message;
    }
};

export const deleteAttendance = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/attendance/${id}`);
        return response.data;
    } catch (error) {
        console.error('Attendance API error:', error);
        throw error.response?.data || error.message;
    }
};

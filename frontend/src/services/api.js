import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addAttendance = async (attendanceData) => {
    try {
        const response = await axios.post(`${API_URL}/attendance`, attendanceData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAttendance = async () => {
    try {
        const response = await axios.get(`${API_URL}/attendance`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteAttendance = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/attendance/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
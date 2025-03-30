import axios from 'axios';

const API_URL = 'http://localhost:8080/api/students';

export const registerStudent = async (studentData) => {
    const response = await axios.post(`${API_URL}/register`, studentData);
    return response.data;
};

export const getAllStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
import axios from "axios";

import apiRoutes from "./config";

const AUTH_REST_API_BASE_URL = apiRoutes.clients;

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

export const loginAPICall = async (email, password) => {
    try {
        const response = await axios.post(AUTH_REST_API_BASE_URL + '/login', { email, password });
        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Account does not exist.');
            } else if (error.response.status === 401) {
                throw new Error('Password incorrect.');
            } else {
                throw new Error('An error occurred. Please try again.');
            }
        } else {
            throw new Error('Network error');
        }
    }
};



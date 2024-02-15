import axios from "axios";
import { Cookies } from 'react-cookie';
import configFile from "../dataset/dataStore";
const cookie = new Cookies();

class AuthAPI {
    // static baseUrl = "http://127.0.0.1:8000/auth";
    static baseUrl = `${configFile.backendBaseUrl || configFile.localBaseUrl}auth`;

    static async SignupUser(body) {
        try {
            const response = await axios.post(`${this.baseUrl}/signup/`, body, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return response;
        } catch (error) {
            // if (error.response) {
            //     return error.response;
            // }
            // console.log(error);
            throw error;
        }
    }

    static async LoginUser(body) {
        try {
            const response = await axios.post(`${this.baseUrl}/login/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            // if (error.response) {
            //     console.error('Server responded with status:', error.response.status);
            //     console.error('Error details:', error.response.data);
            // } else if (error.request) {
            //     console.error('No response received from the server');
            // } else {
            //     console.error('Error during request setup:', error.message);
            // }
            throw error;
        }
    }


    static async logoutUser() {
        try {
            // console.log(access_token);
            // console.log(refresh_token);
            const refresh_token = cookie.get("refresh_token");
            const access_token = cookie.get("access_token");
            if (refresh_token && access_token) {
                const response = await axios.post(`${this.baseUrl}/logout/`, { "refresh_token": refresh_token }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access_token}`,
                    },
                });
                return response;
            }
            else {
                throw new Error('Both refresh_token and access_token are required for logout.');
            }
        } catch (error) {
            // console.log(error.message);
            // if (error.response) {
            //     return error.response;
            // }
            throw error;
        }
    }


    static async refreshAccessToken() {
        try {
            const refresh_token = cookie.get("refresh_token");
            const response = await axios.post(`${this.baseUrl}/token/refresh/`, { refresh: refresh_token }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } catch (error) {
            // if (error.response) {
            //     return error.response;
            // }
            throw error;
        }
    }

    static async checkAuthentication() {

        try {
            // console.log("In Access");
            const access_token = cookie.get("access_token");
            const response = await axios.post(`${this.baseUrl}/token/verify/`, { token: access_token }, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            // console.log("In Access");
            return response;
        } catch (error) {
            // if (error.response) {
            //     return error.response;
            // }
            // Other access token verification errors
            // console.log(error.message);
            throw error;
        }
    }

    static async changePassword(body) {
        try {
            const access_token = cookie.get("access_token");
            const response = await axios.post(`${this.baseUrl}/change-password/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            });
            // console.log(response);
            return response;
        } catch (error) {
            // console.log(error);
            // console.log(error.message);
            throw error;
        }
    }
};

export default AuthAPI;

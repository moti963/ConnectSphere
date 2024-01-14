import axios from "axios";
import { Cookies } from 'react-cookie';
import AuthAPI from "../auth/AuthAPI";

const cookie = new Cookies();

class UserAPI {
    static baseUrl = "http://127.0.0.1:8000/users";


    static async sendRequest(url, method, body, isFileUpload = false) {
        try {
            const headers = {
                'Authorization': `JWT ${cookie.get("access_token")}`
            };

            if (isFileUpload) {
                headers['Content-Type'] = 'multipart/form-data';
            } else {
                headers['Content-Type'] = 'application/json';
            }

            const response = await axios({
                method: method,
                url: `${this.baseUrl}/${url}/`,
                headers: headers,
                data: body
            });
            // console.log(response);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized, check if it's due to token expiration
                const expiredToken = cookie.get("access_token");

                if (expiredToken) {
                    try {
                        // Attempt to refresh the token
                        const refreshResponse = await AuthAPI.verifyAccessToken();

                        if (refreshResponse.status === 200) {
                            // Retry the original request with the new access token
                            return this.sendRequest(url, method, body);
                        } else {
                            // Token refresh was unsuccessful, handle appropriately
                            console.error('Token refresh failed:', refreshResponse);
                            throw new Error('Token refresh failed');
                        }
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        throw refreshError;
                    }
                }
            }

            // Handle other errors or the case where the token does not need refreshing
            console.log("Error in sendRequest:", error);
            throw error;
        }
    }


    //UserAccount
    static async getUserAccount() {
        return this.sendRequest('user', 'get');
    }

    static async updateUserAccount(body) {
        return this.sendRequest('user', 'put', body);
    }

    //UserProfile
    static async getUserProfile() {
        return this.sendRequest('profile', 'get');
    }

    static async updateUserProfile(body) {
        return this.sendRequest('profile', 'put', body, true);
    }

    //UserContacts
    static async getUserContacts() {
        return this.sendRequest('contacts', 'get');
    }

    static async addUserContact(body) {
        return this.sendRequest('contacts', 'post', body);
    }

    static async updateUserContact(id, body) {
        return this.sendRequest(`contacts/${id}`, 'put', body);
    }

    static async deleteUserContact(id) {
        return this.sendRequest(`contacts/${id}`, 'delete');
    }

    //UserEducations
    static async getUserEducations() {
        return this.sendRequest('educations', 'get');
    }

    static async addUserEducation(body) {
        return this.sendRequest('educations', 'post', body);
    }

    static async updateUserEducation(id, body) {
        return this.sendRequest(`educations/${id}`, 'put', body);
    }

    static async deleteUserEducation(id) {
        return this.sendRequest(`educations/${id}`, 'delete');
    }

    //UserExperiences
    static async getUserExperiences() {
        return this.sendRequest('work-experiences', 'get');
    }

    static async addUserExperience(body) {
        return this.sendRequest('work-experiences', 'post', body);
    }

    static async updateUserExperience(id, body) {
        return this.sendRequest(`work-experiences/${id}`, 'put', body);
    }

    static async deleteUserExperience(id) {
        return this.sendRequest(`work-experiences/${id}`, 'delete');
    }

    //UserSkills
    static async getUserSkills() {
        return this.sendRequest('skills', 'get');
    }

    static async addUserSkill(body) {
        return this.sendRequest('skills', 'post', body);
    }

    static async updateUserSkill(id, body) {
        return this.sendRequest(`skills/${id}`, 'put', body);
    }

    static async deleteUserSkill(id) {
        return this.sendRequest(`skills/${id}`, 'delete');
    }

    //UserProjects
    static async getUserProjects() {
        return this.sendRequest('projects', 'get');
    }

    static async addUserProject(body) {
        return this.sendRequest('projects', 'post', body);
    }

    static async updateUserProject(id, body) {
        return this.sendRequest(`projects/${id}`, 'put', body);
    }

    static async deleteUserProject(id) {
        return this.sendRequest(`projects/${id}`, 'delete');
    }

    //UserCertifications
    static async getUserCertifications() {
        return this.sendRequest('certifications', 'get');
    }

    static async addUserCertification(body) {
        return this.sendRequest('certifications', 'post', body);
    }

    static async updateUserCertification(id, body) {
        return this.sendRequest(`certifications/${id}`, 'put', body);
    }

    static async deleteUserCertification(id) {
        return this.sendRequest(`certifications/${id}`, 'delete');
    }

    //UserInterests
    static async getUserInterests() {
        return this.sendRequest('interests', 'get');
    }

    static async addUserInterest(body) {
        return this.sendRequest('interests', 'post', body);
    }

    static async updateUserInterest(id, body) {
        return this.sendRequest(`interests/${id}`, 'put', body);
    }

    static async deleteUserInterest(id) {
        return this.sendRequest(`interests/${id}`, 'delete');
    }

    //UserSocialMedia
    static async getUserSocialMedia() {
        return this.sendRequest('social-media', 'get');
    }

    static async addUserSocialMedia(body) {
        return this.sendRequest('social-media', 'post', body);
    }

    static async updateUserSocialMedia(id, body) {
        return this.sendRequest(`social-media/${id}`, 'put', body);
    }

    static async deleteUserSocialMedia(id) {
        return this.sendRequest(`social-media/${id}`, 'delete');
    }

    //UserLanguages
    static async getUserLanguages() {
        return this.sendRequest('languages', 'get');
    }

    static async addUserLanguage(body) {
        return this.sendRequest('languages', 'post', body);
    }

    static async updateUserLanguage(id, body) {
        return this.sendRequest(`languages/${id}`, 'put', body);
    }

    static async deleteUserLanguage(id) {
        return this.sendRequest(`languages/${id}`, 'delete');
    }

    //UserDetailsCanSeeOthers
    static async getUserDetails(username) {
        return this.sendRequest(`user/${username}`, 'get');
    }
}

export default UserAPI;

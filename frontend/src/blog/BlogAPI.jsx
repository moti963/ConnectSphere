import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

class BlogAPI {
    // static baseUrl = "http://127.0.0.1:8000/blog";
    static baseUrl = "https://connectsphere.pythonanywhere.com/blog";
    
    static async getAllBlogs() {
        try {
            const response = await axios.get(`${this.baseUrl}/blogs`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response;
        } catch (error) {
            console.error("Error in fetching blogs:", error.message);
            throw error;
        }
    }

    static async getAllBlogsByPageNumber() {
        try {
            const response = await axios.get(`${this.baseUrl}/blogs`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response;
        } catch (error) {
            console.error("Error in fetching blogs:", error.message);
            throw error;
        }
    }

    static async getAllBlogsByUrl(url) {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response;
        } catch (error) {
            console.error("Error in fetching blogs:", error.message);
            throw error;
        }
    }

    static async getBlogDetails(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/blogs/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;

        } catch (error) {
            console.log("Error in fetching blog", error.message);
            throw error;
        }
    }

    static async getAllTags() {
        try {
            const response = await axios.get(`${this.baseUrl}/tags`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } catch (error) {
            console.log("Error in fetching tags", error.message);
            throw error;
        }
    }

    static async postBlog(body) {
        const access_token = cookie.get("access_token");
        try {
            const response = await axios.post(`${this.baseUrl}/newblog/`, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `JWT ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            console.log("Error in posting blog", error.message);
            throw error;
        }
    }

    static async updateMyBlogPost(id, body) {
        const access_token = cookie.get("access_token");
        try {
            const response = await axios.put(`${this.baseUrl}/update/${id}/`, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `JWT ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            console.log("Error in updating blog", error.message);
            throw error;
        }
    }

    static async deleteMyBlogPost(id) {
        const access_token = cookie.get("access_token");
        try {
            const response = await axios.delete(`${this.baseUrl}/update/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `JWT ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            console.log("Error in deleting blog", error.message);
            throw error;
        }
    }

    static async getBlogByTag(tag_name) {
        try {
            const response = await axios.get(`${this.baseUrl}/by-tag/${tag_name}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } catch (error) {
            console.log("Error in fetching blogs", error.message);
            throw error;
        }
    }

    static async searchBlogs(searchQuery) {
        try {
            const response = await axios.get(`${this.baseUrl}/search/?query=${searchQuery}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response;
        } catch (error) {
            console.log("error in searching blogs");
            throw error;
        }
    }

    static async getMyPublishedBlogs() {
        const access_token = cookie.get("access_token");
        try {
            const response = await axios.get(`${this.baseUrl}/myblogs`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    }

    static async getMyDraftBlogs() {
        const access_token = cookie.get("access_token");
        try {
            const response = await axios.get(`${this.baseUrl}/mydrafts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw error;
        }
    }
};

export default BlogAPI;

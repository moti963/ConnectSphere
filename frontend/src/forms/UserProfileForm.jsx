import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserProfileForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        bio: '',
        location: '',
        birth_date: '',
        gender: '',
        website: ''
    });
    const [fileInput, setFileInput] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(formData);
            if (initialFormData) {
                formData.profile_img = null;
            }
            if (fileInput) {
                formData.profile_img = fileInput;
            }
            // console.log(formData);
            const response = await UserAPI.updateUserProfile(formData);
            // console.log(response);
            setAlertMessage({ type: "success", message: response.message });
            onSubmit();
            setFormData({
                bio: '',
                location: '',
                birth_date: '',
                gender: '',
                website: ''
            });
        } catch (error) {
            console.error(error);

            setAlertMessage({
                type: "danger",
                message: error.response?.data?.message || "An error occurred. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setFileInput(file);
    }

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit Profile' : 'Create Profile'}</h2>
                </div>
                <div className="card-body">
                    {alertMessage &&
                        <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="profile_img" className="form-label">Profile image</label>
                            <input
                                type='file'
                                className="form-control"
                                id="profile_img"
                                name="profile_img"
                                onChange={handleFileInputChange}
                                accept="image/*"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">Bio:</label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                value={formData.bio}
                                onChange={handleChange}
                                maxLength={1000}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birth_date" className="form-label">Birth Date:</label>
                            <input
                                type="date"
                                id="birth_date"
                                name="birth_date"
                                className="form-control"
                                value={formData.birth_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                className="form-control"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="website" className="form-label">Website:</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                className="form-control"
                                value={formData.website}
                                onChange={handleChange}
                                maxLength={255}
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>
                            {loading ? 'Submitting...' : (initialFormData ? 'Save Changes' : 'Create Profile')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfileForm;

import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserSocialMediaForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        media: '',
        media_link: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialFormData || {
            media: '',
            media_link: '',
        });
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (initialFormData && initialFormData.id) {
                await UserAPI.updateUserSocialMedia(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" });
            } else {
                await UserAPI.addUserSocialMedia(formData);
                setAlertMessage({ type: "success", message: "Added successfully" });
            }
            onSubmit();
            setFormData({
                media: '',
                media_link: '',
            });
        } catch (error) {
            // console.error(error);
            setAlertMessage({
                type: "danger",
                message: error.response?.data?.message || "An error occurred. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            {alertMessage &&
                <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit media info' : 'Add new media'}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="media">Media:</label>
                            <select
                                id="media"
                                name="media"
                                className="form-control"
                                value={formData.media}
                                onChange={handleChange}
                                required
                            >
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                                <option value="github">Github</option>
                                <option value="linkedin">Linkedin</option>
                                <option value="twitter">Twitter</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="media_link">Media Link:</label>
                            <input
                                maxLength={100}
                                type="url"
                                id="media_link"
                                name="media_link"
                                className="form-control"
                                value={formData.media_link}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {loading ? "Submitting..." : (<button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Media'}
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSocialMediaForm;

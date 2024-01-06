import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserSocialMediaForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        media: '',
        media_link: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);

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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (initialFormData && initialFormData.id) {
            setAlertMessage({ type: "success", message: "Updated successfully" })
        }
        else {
            setAlertMessage({ type: "success", message: "Added successfully" })
        }

    };

    return (
        <div className="container mt-3">
            {alertMessage &&
                <AlertMessage type={alertMessage.type} message={alertMessage.message} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit' : 'Add'} Contact Info</h2>
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
                                type="url"
                                id="media_link"
                                name="media_link"
                                className="form-control"
                                value={formData.media_link}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Contact'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSocialMediaForm;

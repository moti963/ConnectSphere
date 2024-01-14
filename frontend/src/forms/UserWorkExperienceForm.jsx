import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserWorkExperienceForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialFormData || {
            company_name: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
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
                await UserAPI.updateUserExperience(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserExperience(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({
                company_name: '',
                position: '',
                start_date: '',
                end_date: '',
                description: '',
            });
        } catch (error) {
            console.error(error);

            setAlertMessage({
                type: "danger",
                message: error.response?.data?.message || "An error occurred. Please try again.",
            });
        } finally { setLoading(false); }
    };

    return (
        <div className="container mt-3">
            {alertMessage &&
                <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit experience info' : 'Add new experience'}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="company_name">Company Name:</label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                className="form-control"
                                value={formData.company_name}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="position">Position:</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                className="form-control"
                                value={formData.position}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start_date">Start Date:</label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                className="form-control"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end_date">End Date:</label>
                            <input
                                type="date"
                                id="end_date"
                                name="end_date"
                                className="form-control"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                maxLength={500}
                                required
                            />
                        </div>
                        {loading ? "Submitting..." : (
                            <button type="submit" className="btn btn-sm btn-primary m-2">
                                {initialFormData ? 'Save Changes' : 'Add Experience'}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserWorkExperienceForm;

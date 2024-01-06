import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserWorkExperienceForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);

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
                    <h2>{initialFormData ? 'Edit' : 'Add'} Experience Info</h2>
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
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Experience'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserWorkExperienceForm;

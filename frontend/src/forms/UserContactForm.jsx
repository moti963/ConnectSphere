import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserContactForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        email: '',
        phone_number: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    useEffect(() => {
        setFormData(initialFormData || { email: '', phone_number: '' });
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
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_number">Phone Number:</label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className="form-control"
                                value={formData.phone_number}
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

export default UserContactForm;

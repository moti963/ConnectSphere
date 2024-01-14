import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserContactForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        email: '',
        phone_number: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialFormData || { email: '', phone_number: '' });
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
        // console.log("data : ", formData);
        try {
            if (initialFormData && initialFormData.id) {
                await UserAPI.updateUserContact(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserContact(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({ email: '', phone_number: '' });
        } catch (error) {
            // console.log(error);
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
                    <h2>{initialFormData ? 'Edit contact info' : 'Add new contact'}</h2>
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
                                maxLength={255}
                                required
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
                                minLength={10}
                                maxLength={15}
                                required
                            />
                        </div>

                        {loading ? "Submitting..." : (<button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Contact'}
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserContactForm;

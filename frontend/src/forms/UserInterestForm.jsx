import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserInterestForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState({
        interest_name: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialFormData || { interest_name: '' });
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialFormData && initialFormData.id) {
                await UserAPI.updateUserInterest(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserInterest(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({ interest_name: '' });
        } catch (error) {
            console.log(error.message);
            setAlertMessage({
                type: "danger",
                message: error.response?.data?.message || "An error occurred. Please try again.",
            });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            {alertMessage &&
                <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleAlertClose} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit interest info' : 'Add new interest'}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="interest_name">Interest Name:</label>
                            <input
                                type="text"
                                id="interest_name"
                                name="interest_name"
                                className="form-control"
                                maxLength={255}
                                value={formData.interest_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {loading ? 'Submitting...' : (initialFormData ? 'Save Changes' : 'Add Interest')}
                        </button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default UserInterestForm;

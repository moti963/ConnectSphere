import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserInterestForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState({
        interest_name: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        setFormData(initialFormData || { interest_name: '' });
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
                    <h2>{initialFormData ? 'Edit' : 'Add'} Interest Info</h2>
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
                                value={formData.interest_name}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Interest'}
                        </button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default UserInterestForm;

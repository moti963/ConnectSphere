import React, { useEffect, useState } from 'react';
import AlertMessage from '../components/AlertMessage';


const UserCertificationForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        certification_name: '',
        issuing_organization: '',
        issue_date: '',
        expiration_date: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);


    useEffect(() => {
        setFormData(initialFormData || {
            certification_name: '',
            issuing_organization: '',
            issue_date: '',
            expiration_date: '',
        });
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call onSubmit with the form data
        // onSubmit(formData);
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
                            <label htmlFor="certification_name">Certification Name:</label>
                            <input
                                type="text"
                                id="certification_name"
                                name="certification_name"
                                className="form-control"
                                value={formData.certification_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="issuing_organization">Issuing Organization:</label>
                            <input
                                type="text"
                                id="issuing_organization"
                                name="issuing_organization"
                                className="form-control"
                                value={formData.issuing_organization}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="issue_date">Issue Date:</label>
                            <input
                                type="date"
                                id="issue_date"
                                name="issue_date"
                                className="form-control"
                                value={formData.issue_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiration_date">Expiration Date (optional):</label>
                            <input
                                type="date"
                                id="expiration_date"
                                name="expiration_date"
                                className="form-control"
                                value={formData.expiration_date}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Certificate'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserCertificationForm;

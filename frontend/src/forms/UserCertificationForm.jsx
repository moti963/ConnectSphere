import React, { useEffect, useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';


const UserCertificationForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        certification_name: '',
        issuing_organization: '',
        issue_date: '',
        expiration_date: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(null);


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

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            onSubmit(formData);
            if (initialFormData && initialFormData.id) {
                await UserAPI.updateUserCertification(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserCertification(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({
                certification_name: '',
                issuing_organization: '',
                issue_date: '',
                expiration_date: '',
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

    return (
        <div className="container mt-3">
            {alertMessage &&
                <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit certification info' : 'Add new certification'}</h2>
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
                                maxLength={255}
                                required
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
                                maxLength={255}
                                required
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
                                required
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
                                required
                            />
                        </div>
                        {loading ? "Submitting..." : (<button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Certificate'}
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserCertificationForm;

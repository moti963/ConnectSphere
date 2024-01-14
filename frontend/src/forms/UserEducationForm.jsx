import React, { useEffect, useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserEducationForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        school_name: '',
        degree: '',
        field_of_study: '',
        graduation_year: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialFormData || {
            school_name: '',
            degree: '',
            field_of_study: '',
            graduation_year: '',
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
                await UserAPI.updateUserEducation(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserEducation(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({
                school_name: '',
                degree: '',
                field_of_study: '',
                graduation_year: '',
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
                    <h2>{initialFormData ? 'Edit education info' : 'Add new education'}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="school_clg">School/College Name:</label>
                            <input
                                type="text"
                                id="school_clg"
                                name="school_clg"
                                className="form-control"
                                value={formData.school_clg}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="degree">Degree:</label>
                            <input
                                type="text"
                                id="degree"
                                name="degree"
                                className="form-control"
                                value={formData.degree}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_of_study">Field of Study:</label>
                            <input
                                type="text"
                                id="field_of_study"
                                name="field_of_study"
                                className="form-control"
                                value={formData.field_of_study}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="graduation_year">Graduation Year:</label>
                            <input
                                type="number"
                                id="graduation_year"
                                name="graduation_year"
                                className="form-control"
                                value={formData.graduation_year}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {loading ? "Submitting..." : (<button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Education'}
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEducationForm;

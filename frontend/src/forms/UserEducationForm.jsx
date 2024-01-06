import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserEducationForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        school_name: '',
        degree: '',
        field_of_study: '',
        graduation_year: '',
    });

    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialFormData && initialFormData.id) {
            setAlert({ type: "success", message: "Updated successfully" })
        }
        else {
            setAlert({ type: "success", message: "Added successfully" })
        }
    };

    return (
        <div className="container mt-3">
            {alert &&
                <AlertMessage type={alert.type} message={alert.message} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit' : 'Add'} Contact Info</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="school_clg">School Name:</label>
                            <input
                                type="text"
                                id="school_clg"
                                name="school_clg"
                                className="form-control"
                                value={formData.school_clg}
                                onChange={handleChange}
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
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Education'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEducationForm;

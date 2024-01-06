import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserLanguageForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        language_name: '',
        proficiency_level: 'INTERMEDIATE',
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => { setFormData(initialFormData || { language_name: '', proficiency_level: '' }); }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call onSubmit with the form data
        // onSubmit(formData);
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
                    <h2>{initialFormData ? 'Edit' : 'Add'} Language Info</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="language_name">Language Name:</label>
                            <input
                                type="text"
                                id="language_name"
                                name="language_name"
                                className="form-control"
                                value={formData.language_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proficiency_level">Proficiency Level:</label>
                            <select
                                id="proficiency_level"
                                name="proficiency_level"
                                className="form-control"
                                value={formData.proficiency_level}
                                onChange={handleChange}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="elementary">Elementary</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="fluent">Fluent</option>
                                <option value="native">Native</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Language'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserLanguageForm;

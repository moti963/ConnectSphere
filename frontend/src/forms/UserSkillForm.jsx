import React, { useEffect, useState } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserSkillForm = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        skill_name: '',
        proficiency_level: '',
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setFormData(initialFormData || { skill_name: '', proficiency_level: '' });
    }, [initialFormData])

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
                    <h2>{initialFormData ? 'Edit' : 'Add'} Skill Info</h2>
                </div>
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="skill_name">Skill:</label>
                            <input
                                type="text"
                                id="skill_name"
                                name="skill_name"
                                className="form-control"
                                value={formData.skill_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proficiency_level">Proficiency Level:</label>
                            <input
                                type="text"
                                id="proficiency_level"
                                name="proficiency_level"
                                className="form-control"
                                value={formData.proficiency_level}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Skill'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSkillForm;

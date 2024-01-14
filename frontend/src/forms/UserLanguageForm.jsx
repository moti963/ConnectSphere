import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserLanguageForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        language_name: '',
        proficiency_level: 'beginner'
    });

    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => { setFormData(initialFormData || { language_name: '', proficiency_level: 'beginner' }); }, [initialFormData]);

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
                await UserAPI.updateUserLanguage(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserLanguage(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({
                language_name: '',
                proficiency_level: 'beginner'
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
                    <h2>{initialFormData ? 'Edit language info' : 'Add new language'} </h2>
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
                                maxLength={255}
                                required
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
                                required
                            >
                                <option value="beginner">Beginner</option>
                                <option value="elementary">Elementary</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                <option value="fluent">Fluent</option>
                                <option value="native">Native</option>
                            </select>
                        </div>
                        {loading ? "Submitting..." : (<button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Language'}
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserLanguageForm;

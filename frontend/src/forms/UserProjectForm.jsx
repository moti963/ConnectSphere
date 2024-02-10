import React, { useState, useEffect } from 'react';
import AlertMessage from '../components/AlertMessage';
import UserAPI from '../user/UserAPI';

const UserProjectForm = ({ initialFormData, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData || {
        project_name: '',
        description: '',
        start_date: '',
        end_date: '',
        project_link: '',
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(initialFormData || {
            project_name: '',
            description: '',
            start_date: '',
            end_date: '',
            project_link: '',
        });

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
                await UserAPI.updateUserProject(initialFormData.id, formData);
                setAlertMessage({ type: "success", message: "Updated successfully" })
            }
            else {
                await UserAPI.addUserProject(formData);
                setAlertMessage({ type: "success", message: "Added successfully" })
            }
            onSubmit();
            setFormData({
                project_name: '',
                description: '',
                start_date: '',
                end_date: '',
                project_link: ''
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
                <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleAlertClose} />
            }
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2>{initialFormData ? 'Edit' : 'Add new'} project</h2>
                </div>
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="project_name">Project Name:</label>
                            <input
                                type="text"
                                id="project_name"
                                name="project_name"
                                className="form-control"
                                value={formData.project_name}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                rows={6}
                                onChange={handleChange}
                                maxLength={1000}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start_date">Start Date:</label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                className="form-control"
                                value={formData.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end_date">End Date (optional):</label>
                            <input
                                type="date"
                                id="end_date"
                                name="end_date"
                                className="form-control"
                                value={formData.end_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="project_link">Project Link:</label>
                            <input
                                type="url"
                                id="project_link"
                                name="project_link"
                                className="form-control"
                                value={formData.project_link}
                                onChange={handleChange}
                                maxLength={255}
                                required
                            />
                        </div>
                        {loading ? "Submitting..." : (<button type="submit" className="btn btn-sm btn-primary m-2">
                            {initialFormData ? 'Save Changes' : 'Add Project'}
                        </button>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProjectForm;

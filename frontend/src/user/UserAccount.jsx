import React, { useEffect, useState } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';


const UserAccount = () => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await UserAPI.getUserAccount();
                setAccount(response);

                if (!response) {
                    setAlertMessage({ type: "warning", message: "No account found." });
                }
            } catch (error) {
                setAlertMessage({ type: "danger", message: "Error fetching profile. Please try again later." });
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
        setFormData({
            username: account.username,
            email: account.email,
            first_name: account.first_name,
            last_name: account.last_name,
        });
    };

    const handleCancelClick = () => {
        setEditMode(false);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await UserAPI.updateUserAccount(formData);
            setAlertMessage({ type: "success", message: "Successfully updated profile." });
            setAccount(response);
            setEditMode(false);
        } catch (error) {
            setAlertMessage({ type: "danger", message: "Error updating profile. Please try again later." });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="container mt-5">
            {loading && <p className="text-center">Loading account...</p>}
            {alertMessage && (<AlertMessage type={alertMessage.type} message={alertMessage.message} />)}
            {account && (
                <div className="card shadow">
                    <div className="card-header bg-primary text-white">
                        <h2>{editMode ? 'Edit Account' : 'Account Information'}</h2>
                    </div>
                    <div className="card-body">
                        {!editMode && (
                            <div className="mb-4">
                                <h3 className="mb-3">Welcome, {account.username}!</h3>
                                <p>Email: {account.email}</p>
                                <p>Name: {`${account.first_name} ${account.last_name}`}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleEditClick}
                                >
                                    Edit Account
                                </button>
                            </div>
                        )}
                        {editMode && (
                            <form onSubmit={handleSaveChanges}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        type='submit'
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAccount;

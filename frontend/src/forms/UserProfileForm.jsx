import React, { useState } from 'react';

const UserProfileForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        bio: '',
        location: '',
        birth_date: '',
        gender: '',
        website: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call onSubmit with the form data
        onSubmit(formData);
    };

    return (
        <div className="container mt-3">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        className="form-control"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birth_date">Birth Date:</label>
                    <input
                        type="date"
                        id="birth_date"
                        name="birth_date"
                        className="form-control"
                        value={formData.birth_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <input
                        type="text"
                        id="gender"
                        name="gender"
                        className="form-control"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website:</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        className="form-control"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default UserProfileForm;

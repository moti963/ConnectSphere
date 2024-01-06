import React, { useEffect, useState } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';

const UserProfileDisplay = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    birth_date: '',
    gender: '',
    website: '',
    profile_img: '', // Add profile_img here
  });

  const [fileInput, setFileInput] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileInput(file);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserAPI.getUserProfile();
        setProfile(response);

        // If the profile exists, set form data for editing
        if (response) {
          setFormData({
            profile_img: response.profile_img || '',
            bio: response.bio || '',
            location: response.location || '',
            birth_date: response.birth_date || '',
            gender: response.gender || '',
            website: response.website || '',
          });
          setFileInput(response.profile_img);
        }
      } catch (error) {
        setAlertMessage({ type: 'danger', message: 'Error fetching profile. Please try again later.' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset form data when exiting edit mode
    setFormData({
      profile_img: profile.profile_img || '',
      bio: profile.bio || '',
      location: profile.location || '',
      birth_date: profile.birth_date || '',
      gender: profile.gender || '',
      website: profile.website || '',
    });
    setFileInput(null); // Reset file input
  };

  const handleSaveChanges = async () => {
    try {
      // Basic form validation
      if (!formData.bio || !formData.location || !formData.birth_date || !formData.gender) {
        setAlertMessage({ type: 'danger', message: 'Please fill in all required fields.' });
        return;
      }

      // Uncomment and replace with your logic for updating user profile
      const response = await UserAPI.updateUserProfile(formData, fileInput);
      setProfile(response);
      setAlertMessage({ type: 'success', message: 'Profile updated successfully.' });
      setEditMode(false);
    } catch (error) {
      setAlertMessage({ type: 'danger', message: 'Error updating profile. Please try again later.' });
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
      {loading && <p className="text-center">Loading profile...</p>}
      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
      {profile && (
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2>{editMode ? 'Edit Profile' : 'Profile Information'}</h2>
          </div>
          <div className="card-body">
            {!editMode && (
              <div>
                <img
                  src={profile.profile_img}
                  alt="Profile"
                  className="rounded-circle img-thumbnail mb-3"
                  style={{ maxWidth: '200px', height: 'auto' }}
                />

                <p className="card-text">Bio: {profile.bio || 'No bio available'}</p>
                <p className="card-text">Location: {profile.location || 'Unknown'}</p>
                <p className="card-text">Birth Date: {profile.birth_date || 'Unknown'}</p>
                <p className="card-text">Gender: {profile.gender || 'Unknown'}</p>
                {profile.website && (
                  <p className="card-text">
                    Website: <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a>
                  </p>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>
            )}
            {editMode && (
              <form onSubmit={handleSaveChanges}>
                {/* <div className="mb-3">
                  <label htmlFor="profile_img" className="form-label">Profile image</label>
                  <input
                    type='file'
                    className="form-control"
                    id="profile_img"
                    name="profile_img"
                    onChange={handleFileInputChange}
                    accept="image/*"
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="birth_date" className="form-label">Birth Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birth_date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="website" className="form-label">Website</label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  className="btn btn-secondary me-2"
                  type="button"  // Change type to button
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
              </form>
            )}
          </div>
        </div>
      )}
      {!loading && !profile && !alertMessage && <p className="text-center">No profile found.</p>}
    </div>
  );
};

export default UserProfileDisplay;

import React, { useEffect, useState } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserProfileForm from '../forms/UserProfileForm';

const UserProfileDisplay = () => {
  const [profile, setProfile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await UserAPI.getUserProfile();
      // console.log(response);
      setProfile(response);
    } catch (error) {
      setAlertMessage({ type: 'danger', message: 'Error fetching profile. Please try again later.' });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // console.log("Hiii");
    setEditMode(true);
  };

  const handleCancelClick = () => {
    // console.log("Bye");
    setEditMode(false);
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  }

  return (
    <div className="container mt-5">
      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}

      {editMode && (<UserProfileForm initialFormData={profile} onSubmit={fetchProfile} />)}

      {!editMode && profile && (
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2>{editMode ? 'Edit Profile' : 'Profile Information'}</h2>
          </div>
          <div className="card-body">
            {!editMode && (
              <div>
                <img
                  src={"http://127.0.0.1:8000" + profile.profile_img}
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
                  className="btn btn-sm btn-primary"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!profile && (<button
        className="btn btn-sm btn-primary"
        onClick={handleEditProfile}
      >
        Edit Profile
      </button>)}
      
      {(editMode || !profile) && (
        <button
          className="btn btn-sm btn-secondary m-2"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      )}

      {!profile && !alertMessage && <p className="text-center">No profile found.</p>}
    </div>
  );
};

export default UserProfileDisplay;  

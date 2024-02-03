import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserWorkExperienceForm from '../forms/UserWorkExperienceForm';

const UserWorkExperienceDisplay = () => {
  const [experiences, setExperiences] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isAddingNewExperience, setIsAddingNewExperience] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchUserExperiences = async () => {
    try {
      const response = await UserAPI.getUserExperiences();
      setExperiences(response);
    } catch (error) {
      console.log(error.messages);
      setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
    }
  }

  useEffect(() => { fetchUserExperiences(); }, []);

  const handleEditExperience = (experience) => {
    setSelectedExperience(experience);
    setIsAddingNewExperience(false);
  };

  const handleAddNewExperience = () => {
    setSelectedExperience(null);
    setIsAddingNewExperience(true);
  };

  const handleCancelClick = () => {
    setSelectedExperience(null);
    setIsAddingNewExperience(false);
  }

  const handleAlertClose = () => {
    setAlertMessage(null);
  }

  const handleDeleteExperience = async (experience) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await UserAPI.deleteUserExperience(experience.id);
        setExperiences((prevExperiences) =>
          prevExperiences.filter((e) => e.id !== experience.id)
        );
        setAlertMessage({ type: "success", message: "Experience deleted successfully." });
      } catch (error) {
        console.log(error.message);
        setAlertMessage({ type: "danger", message: "Unable to delete the experience." });
      }
    }
  };

  return (
    <div className="container mt-3">
      {/* Conditionally render the form for editing or adding a new Experience */}
      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleAlertClose} />}

      {(selectedExperience || isAddingNewExperience) && (
        <UserWorkExperienceForm initialFormData={selectedExperience} onSubmit={fetchUserExperiences} />
      )}

      {(!selectedExperience && !isAddingNewExperience && experiences) ? (
        <div className="row">
          {experiences.map((experience, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <p>Company: {experience.company_name}</p>
                  <p>Position: {experience.position}</p>
                  <p>Start Date: {experience.start_date}</p>
                  <p>End Date: {experience.end_date}</p>
                  <p>Description: {experience.description}</p>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => handleEditExperience(experience)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger m-2"
                    onClick={() => handleDeleteExperience(experience)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>))}
        </div>) : null}

      {(!selectedExperience && !isAddingNewExperience && (!experiences || experiences.length === 0)) ? (
        <h1 className='m-2'>No information found, Please add...</h1>
      ) : null}

      {/* Button to trigger adding a new Experience */}
      {!isAddingNewExperience && (
        <button
          className="btn btn-sm btn-success mx-2 mt-3"
          onClick={handleAddNewExperience}
        >
          Add New Experience
        </button>
      )}
      {(selectedExperience || isAddingNewExperience) && (
        <button
          className="btn btn-sm btn-secondary mx-2 mt-3"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default UserWorkExperienceDisplay;

import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserEduactionForm from '../forms/UserEducationForm';

const UserEducationDisplay = () => {
  const [educations, setEducations] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [isAddingNewEducation, setIsAddingNewEducation] = useState(false);
  const [alert, setAlert] = useState(false);

  const fetchUserEducations = async () => {
    try {
      const response = await UserAPI.getUserEducations();
      setEducations(response);
    } catch (error) {
      console.log(error.message);
      setAlert({ type: "danger", message: "Unable to load education details." });
    }
  };

  const handleDeleteEducation = async (education) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      try {
        // await UserAPI.deleteUserContact(education.id);
        setEducations((prevEducations) =>
          prevEducations.filter((e) => e.id !== education.id)
        );
        setAlert({ type: "success", message: "Contact deleted successfully." });
      } catch (error) {
        console.log(error.message);
        setAlert({ type: "danger", message: "Unable to delete the education." });
      }
    }
  };

  useEffect(() => {
    fetchUserEducations();
  }, []);

  const handleEditEducation = (education) => {
    setSelectedEducation(education);
    setIsAddingNewEducation(false);
  }

  const handleAddNewEducation = () => {
    setSelectedEducation(null);
    setIsAddingNewEducation(true);
  }

  const handleCancelClick = () => {
    setSelectedEducation(null);
    setIsAddingNewEducation(false);
  }

  return (
    <div className="container mt-3">
      {alert && <AlertMessage type={alert.type} message={alert.message} />}

      {(selectedEducation || isAddingNewEducation) && (<UserEduactionForm initialFormData={selectedEducation} />)}

      {!selectedEducation && !isAddingNewEducation && educations ? (
        <div className="row">
          {educations.map((education, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text"><strong>School/College:</strong> {education.school_clg}</p>
                  <p className="card-text"><strong>Degree:</strong> {education.degree}</p>
                  <p className="card-text"><strong>Field of Study:</strong> {education.field_of_study}</p>
                  <p className="card-text"><strong>Graduation Year:</strong> {education.graduation_year}</p>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => handleEditEducation(education)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger m-2"
                    onClick={() => handleDeleteEducation(education)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        null
      )}

      {!isAddingNewEducation && (<button className='btn btn-sm btn-primary m-2' onClick={handleAddNewEducation}>Add new education</button>)}
      {(selectedEducation || isAddingNewEducation) && (<button className='btn btn-sm btn-secondary m-2' onClick={handleCancelClick}>Cancel</button>)}

    </div>
  );
};

export default UserEducationDisplay;

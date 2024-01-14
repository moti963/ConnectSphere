import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import UserLanguageForm from '../forms/UserLanguageForm';
import AlertMessage from '../components/AlertMessage';


const UserLanguageDisplay = () => {
    const [languages, setLanguages] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [isAddingNewLanguage, setIsAddingNewLanguage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchUserLanguages = async () => {
        try {
            const response = await UserAPI.getUserLanguages();
            setLanguages(response);
        } catch (error) {
            console.log(error.message);
            setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
        }
    }

    useEffect(() => { fetchUserLanguages(); }, []);

    const handleEditLanguage = (Language) => {
        setSelectedLanguage(Language);
        setIsAddingNewLanguage(false);
    };

    const handleAddNewLanguage = () => {
        setSelectedLanguage(null);
        setIsAddingNewLanguage(true);
    };

    const handleCancelClick = () => {
        setSelectedLanguage(null);
        setIsAddingNewLanguage(false);
    }


    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    const handleDeleteLanguage = async (language) => {
        if (window.confirm("Are you sure you want to delete this Language?")) {
            try {
                await UserAPI.deleteUserLanguage(language.id);
                setLanguages((prevLanguages) =>
                    prevLanguages.filter((l) => l.id !== language.id)
                );
                setAlertMessage({ type: "success", message: "Language deleted successfully." });
            } catch (error) {
                console.log(error.message);
                setAlertMessage({ type: "danger", message: "Unable to delete the Language." });
            }
        }
    };

    return (
        <div className="container mt-3">
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}

            {(selectedLanguage || isAddingNewLanguage) && (
                <UserLanguageForm initialFormData={selectedLanguage} onSubmit={fetchUserLanguages} />
            )}

            {!selectedLanguage && !isAddingNewLanguage &&
                languages ? (
                <div className="row">
                    {languages.map((language, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <p className='card-text'>Language: {language.language_name}</p>
                                    <p className='card-text'>Proficiency Level: {language.proficiency_level}</p>
                                    <button
                                        className="btn btn-sm btn-primary m-2"
                                        onClick={() => handleEditLanguage(language)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger m-2"
                                        onClick={() => handleDeleteLanguage(language)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}


            {/* Button to trigger adding a new Language */}
            {!isAddingNewLanguage && (
                <button
                    className="btn btn-sm btn-success mx-2 mt-3"
                    onClick={handleAddNewLanguage}
                >
                    Add New Language
                </button>
            )}
            {(selectedLanguage || isAddingNewLanguage) && (
                <button
                    className="btn btn-sm btn-secondary mx-2 mt-3"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            )}
        </div >
    );
};

export default UserLanguageDisplay;

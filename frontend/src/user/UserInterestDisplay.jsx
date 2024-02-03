import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserInterestForm from '../forms/UserInterestForm';


const UserInterestDisplay = () => {
    const [interests, setInterests] = useState(null);
    const [selectedInterest, setSelectedInterest] = useState(null);
    const [isAddingNewInterest, setIsAddingNewInterest] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchUserInterests = async () => {
        try {
            const response = await UserAPI.getUserInterests();
            setInterests(response);
        } catch (error) {
            console.log(error.message);
            setAlertMessage({ type: "danger", message: "Unable to fetch your details." });

        }
    };

    useEffect(() => {
        fetchUserInterests();
    }, []);

    const handleEditInterest = (interest) => {
        setSelectedInterest(interest);
        setIsAddingNewInterest(false);
    };

    const handleAddNewInterest = () => {
        setSelectedInterest(null);
        setIsAddingNewInterest(true);
    };

    const handleCancelClick = () => {
        setSelectedInterest(null);
        setIsAddingNewInterest(false);
    }

    const handleAlertClose = () => {
        setAlertMessage(null);
    }

    const handleDeleteInterest = async (interest) => {
        if (window.confirm("Are you sure you want to delete this interest?")) {
            try {
                await UserAPI.deleteUserInterest(interest.id);
                setInterests((prevInterests) =>
                    prevInterests.filter((c) => c.id !== interest.id)
                );
                setAlertMessage({ type: "success", message: "Interest deleted successfully." });
            } catch (error) {
                console.log(error.message);
                setAlertMessage({ type: "danger", message: "Unable to delete the interest." });
            }
        }
    };

    return (
        <div className="container mt-3">
            {/* Conditionally render the form for editing or adding a new Interest */}
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleAlertClose} />}

            {(selectedInterest || isAddingNewInterest) && (
                <UserInterestForm initialFormData={selectedInterest} onSubmit={fetchUserInterests} />
            )}

            {(!selectedInterest && !isAddingNewInterest && interests) ? (
                <div className="row">
                    {interests.map((interest, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">Interest: {interest.interest_name}</p>
                                    <button
                                        className="btn btn-sm btn-primary m-2"
                                        onClick={() => handleEditInterest(interest)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger m-2"
                                        onClick={() => handleDeleteInterest(interest)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            {(!selectedInterest && !isAddingNewInterest && (!interests || interests.length === 0)) ? (
                <h1 className='m-2'>No information found, Please add...</h1>
            ) : null}

            {/* Button to trigger adding a new Interest */}
            {!isAddingNewInterest && (
                <button
                    className="btn btn-sm btn-success mx-2 mt-3"
                    onClick={handleAddNewInterest}
                >
                    Add New Interest
                </button>
            )}
            {(selectedInterest || isAddingNewInterest) && (
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

export default UserInterestDisplay;

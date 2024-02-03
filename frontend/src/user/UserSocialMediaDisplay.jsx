import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserSocialMediaForm from '../forms/UserSocialMediaForm';


const UserSocialMediaDisplay = () => {
    const [socialMedia, setSocialMedia] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isAddingNewMedia, setIsAddingNewMedia] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchUserSocialMedia = async () => {
        try {
            const response = await UserAPI.getUserSocialMedia();
            setSocialMedia(response);
        } catch (error) {
            // console.log(error.messages);
            setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
        }
    }
    useEffect(() => { fetchUserSocialMedia(); }, []);

    const handleEditMedia = (media) => {
        setSelectedMedia(media);
        setIsAddingNewMedia(false);
    };

    const handleAddNewMedia = () => {
        setSelectedMedia(null);
        setIsAddingNewMedia(true);
    };

    const handleCancelClick = () => {
        setSelectedMedia(null);
        setIsAddingNewMedia(false);
    }

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    const handleDeleteMedia = async (media) => {
        if (window.confirm("Are you sure you want to delete this media?")) {
            try {
                await UserAPI.deleteUserSocialMedia(media.id);
                setSocialMedia((prevSocialMedia) =>
                    prevSocialMedia.filter((m) => m.id !== media.id)
                );
                setAlertMessage({ type: "success", message: "Media deleted successfully." });
            } catch (error) {
                console.log(error.message);
                setAlertMessage({ type: "danger", message: "Unable to delete the media." });
            }
        }
    }

    return (
        <div className="container mt-3">

            {/* Conditionally render the form for editing or adding a new Media */}
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}

            {(selectedMedia || isAddingNewMedia) && (
                <UserSocialMediaForm initialFormData={selectedMedia} onSubmit={fetchUserSocialMedia} />
            )}

            {(!selectedMedia && !isAddingNewMedia && socialMedia) ? (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {socialMedia.map((media, index) => (
                        <div key={index} className="col-md-4 mb-4 col">
                            <div className="card">
                                <div className="card-body">
                                    <p>Media: {media.media}</p>
                                    <p>Media Link: <a href={media.media_link} target="_blank" rel="noopener noreferrer">{media.media_link}</a></p>
                                    <button
                                        className="btn btn-sm btn-primary m-2"
                                        onClick={() => handleEditMedia(media)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger m-2"
                                        onClick={() => handleDeleteMedia(media)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            ) : null}

            {(!selectedMedia && !isAddingNewMedia && (!socialMedia || socialMedia.length === 0)) ? (
                <h1 className='m-2'>No information found, Please add...</h1>
            ) : null}

            {/* Button to trigger adding a new Media */}
            {!isAddingNewMedia && (
                <button
                    className="btn btn-sm btn-success m-2"
                    onClick={handleAddNewMedia}
                >
                    Add New Media
                </button>
            )}
            {(selectedMedia || isAddingNewMedia) && (
                <button
                    className="btn btn-sm btn-secondary m-2"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default UserSocialMediaDisplay;

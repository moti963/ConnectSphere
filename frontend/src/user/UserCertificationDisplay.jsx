import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import UserCertificationForm from '../forms/UserCertificationForm';
import AlertMessage from '../components/AlertMessage';
import noData from "../static/images/no_info_found.jpg";

const UserCertificationDisplay = () => {
    const [certifications, setCertifications] = useState(null);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [isAddingNewCertification, setIsAddingNewCertification] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchUserCertifications = async () => {
        try {
            const response = await UserAPI.getUserCertifications();
            setCertifications(response);
        } catch (error) {
            console.error(error.message);
            // setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
        }
    };

    useEffect(() => {
        fetchUserCertifications();
    }, []);

    const handleEditCertification = (certification) => {
        setSelectedCertification(certification);
        setIsAddingNewCertification(false);
    };

    const handleAddNewCertification = () => {
        setSelectedCertification(null);
        setIsAddingNewCertification(true);
    };

    const handleCancelClick = () => {
        setSelectedCertification(null);
        setIsAddingNewCertification(false);
    }

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    const handleDeleteCertification = async (certification) => {
        if (window.confirm("Are you sure you want to delete this certification?")) {
            try {
                await UserAPI.deleteUserCertification(certification.id);
                setCertifications((prevCertifications) =>
                    prevCertifications.filter((c) => c.id !== certification.id)
                );
                setAlertMessage({ type: "success", message: "Certification deleted successfully." });
            } catch (error) {
                console.log(error.message);
                setAlertMessage({ type: "danger", message: "Unable to delete the certification." });
            }
        }
    };

    return (
        <div className="container mt-3">
            {/* Conditionally render the form for editing or adding a new Certification */}
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}
            {(selectedCertification || isAddingNewCertification) && (
                <UserCertificationForm initialFormData={selectedCertification} onSubmit={fetchUserCertifications} />
            )}

            {/* Display existing certifications */}
            {(!selectedCertification && !isAddingNewCertification && certifications && certifications.length > 0) ? (
                <div className="row my-5">
                    {certifications.map((certification, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <p>Certification Name: {certification.certification_name}</p>
                                    <p>Issuing Organization: {certification.issuing_organization}</p>
                                    <p>Issue Date: {certification.issue_date}</p>
                                    <p>Expiration Date: {certification.expiration_date || 'No Expiration Date'}</p>
                                    <button
                                        className="btn btn-sm btn-primary m-2"
                                        onClick={() => handleEditCertification(certification)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger m-2"
                                        onClick={() => handleDeleteCertification(certification)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            {(!selectedCertification && !isAddingNewCertification && (!certifications || certifications.length === 0)) ? (
                <div className='container'>
                    <img className='m-2' src={noData} alt="No data" />
                    <h1 className='m-2'>No certification information found, Please add...</h1>
                </div>
            ) : null}

            {/* Button to trigger adding a new Certification */}
            {!isAddingNewCertification && (
                <button
                    className="btn btn-sm btn-success m-2"
                    onClick={handleAddNewCertification}
                >
                    Add New Certification
                </button>
            )}
            {(selectedCertification || isAddingNewCertification) && (
                <button
                    className="btn btn-sm btn-secondary m-2"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            )}
        </div >
    );
};

export default UserCertificationDisplay;


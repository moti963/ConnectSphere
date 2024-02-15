// UserContactDisplay.jsx

import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import UserContactForm from '../forms/UserContactForm';
import AlertMessage from '../components/AlertMessage';
import noData from "../static/images/no_info_found.jpg";


const UserContactDisplay = () => {
  const [contacts, setContacts] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddingNewContact, setIsAddingNewContact] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchUserContact = async () => {
    try {
      const response = await UserAPI.getUserContacts();
      setContacts(response);
    } catch (error) {
      console.log(error.message);
      // setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
    }
  };

  useEffect(() => {
    fetchUserContact();
  }, []);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsAddingNewContact(false);
  };

  const handleAddNewContact = () => {
    setSelectedContact(null);
    setIsAddingNewContact(true);
  };

  const handleCancelClick = () => {
    setSelectedContact(null);
    setIsAddingNewContact(false);
  }

  const handleCloseAlert = () => {
    setAlertMessage(null);
  }

  const handleDeleteContact = async (contact) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await UserAPI.deleteUserContact(contact.id);
        setContacts((prevContacts) =>
          prevContacts.filter((c) => c.id !== contact.id)
        );
        setAlertMessage({ type: "success", message: "Contact deleted successfully." });
      } catch (error) {
        console.log(error.message);
        setAlertMessage({ type: "danger", message: "Unable to delete the contact." });
      }
    }
  };

  return (
    <div className="container mt-5">

      {/* Conditionally render the form for editing or adding a new contact */}
      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}
      {(selectedContact || isAddingNewContact) && (
        <UserContactForm initialFormData={selectedContact} onSubmit={fetchUserContact} />
      )}

      {/* Display the contacts only if neither editing nor adding new contact is in progress */}
      {(!selectedContact && !isAddingNewContact && contacts) ? (
        <div className="row">
          {contacts.map((contact, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">Email: {contact.email}</p>
                  <p className="card-text">Phone Number: {contact.phone_number}</p>
                  <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => handleEditContact(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger m-2"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {(!selectedContact && !isAddingNewContact && (!contacts || contacts.length === 0)) ? (
        <div className='container'>
          <img className='m-2' src={noData} alt="No data" />
          <h1 className='m-2'>No contact's information found, Please add...</h1>
        </div>) : null}

      {/* Button to trigger adding a new contact */}
      {!isAddingNewContact && (
        <button
          className="btn btn-sm btn-success mx-2 mt-3"
          onClick={handleAddNewContact}
        >
          Add New Contact
        </button>
      )}
      {(selectedContact || isAddingNewContact) && (
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

export default UserContactDisplay;

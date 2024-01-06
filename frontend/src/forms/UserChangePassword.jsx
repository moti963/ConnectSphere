import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';

const UserChangePassword = () => {
  const [formData, setFormData] = useState({
    curr_password: '',
    password: '',
    confirm_password: '',
  });
  const [alertMessage, setAlertMessage] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (true) {
      setAlertMessage({ type: "success", message: "Updated successfully" })
    }
    else {
      setAlertMessage({ type: "success", message: "Added successfully" })
    }
  };

  return (
    <div className="container mt-3">
      {alertMessage &&
        <AlertMessage type={alertMessage.type} message={alertMessage.message} />
      }
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2>Change Password</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="curr_password">Current Password:</label>
              <input
                type="password"
                id="curr_password"
                name="curr_password"
                className="form-control"
                value={formData.curr_password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                className="form-control"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-sm btn-primary m-2">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default UserChangePassword;

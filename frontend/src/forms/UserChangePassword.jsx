import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import AuthAPI from '../auth/AuthAPI';

const UserChangePassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    new_password: '',
    confirm_new_password: ''
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, new_password, confirm_new_password } = formData;

    if (new_password !== confirm_new_password) {
      setAlertMessage({ type: "error", message: "New password and confirm new password not matching" });
      return;
    }

    try {
      setLoading(true);
      const response = await AuthAPI.changePassword({ password, new_password });

      if (response.status === 200) {
        setAlertMessage({ type: "success", message: response.data.message });
        setFormData({
          password: '',
          new_password: '',
          confirm_new_password: ''
        });

        // Automatically close the success message after 5 seconds
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
      } else {
        setAlertMessage({ type: "error", message: response.data.error || "Failed to change password" });
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
      setAlertMessage({ type: "error", message: "An error occurred while processing your request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      {alertMessage && (
        <AlertMessage
          type={alertMessage.type}
          message={alertMessage.message}
          onClose={handleAlertClose}
        />
      )}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2>Change Password</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Current Password:</label>
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
            <div className="mb-3">
              <label htmlFor="new_password" className="form-label">New Password:</label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                className="form-control"
                value={formData.new_password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm_new_password" className="form-label">Confirm Password:</label>
              <input
                type="password"
                id="confirm_new_password"
                name="confirm_new_password"
                className="form-control"
                value={formData.confirm_new_password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-primary m-2"
              disabled={loading} 
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserChangePassword;

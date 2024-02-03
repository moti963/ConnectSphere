import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import AlertMessage from '../components/AlertMessage';
import { useSelector } from 'react-redux';
import AuthAPI from './AuthAPI';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
    });
    // const { signup, isAuthenticated } = useAuth();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform password match validation
        if (user.password !== user.password2) {
            setAlertMessage({ type: "danger", message: 'Passwords do not match!' });
            return;
        }

        try {
            // Use the signup function from the authentication context
            // const response = await signup(user);
            const response = await AuthAPI.SignupUser(user);
            // If signup is successful, navigate to the login page
            console.log(response);
            if (response.status !== 200) {
                setAlertMessage({ type: "danger", message: response.message });
            }
            navigate('/user/login');
        } catch (error) {
            // Handle errors and set the error message
            setAlertMessage({ type: "danger", message: 'Failed!!. Please try again.' });
            // setAlertMessage('Failed!!. Please try again.');
        }
    };

    const handleReset = () => {
        setUser({
            username: '',
            email: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
        });
        setAlertMessage(null);
    };

    useEffect(() => {
        // If the user is already authenticated, redirect them to the home page
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (

        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {alertMessage && (
                        <AlertMessage type={alertMessage.type} message={alertMessage.message} />
                    )}
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-3">Sign Up</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={user.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        value={user.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        value={user.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-center my-2">
                                    <button type="submit" className="btn btn-primary m-2">
                                        Sign Up
                                    </button>

                                    <button type="button" className="btn btn-danger m-2" onClick={handleReset}>
                                        Reset
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Signup;

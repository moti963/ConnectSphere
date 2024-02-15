import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import img from '../static/images/logo512.png';
import { login } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlertMessage from '../components/AlertMessage';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();


    const submit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

        try {
            dispatch(login(user));
            if (isAuthenticated) {
                navigate("/");
            }
            else {
                await new Promise(r => setTimeout(r, 2000));
                throw Error;
            }
        } catch (error) {
            console.error("Error in login: ", error.message);
            setAlertMessage({ type: "error", message: 'Invalid credentials. Please try again.' });
        }
    };

    const handleReset = () => {
        setUsername('');
        setPassword('');
        setAlertMessage(null);
    }

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    useEffect(() => {
        // If the user is already authenticated, redirect them to the home page
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center my-5">Sign In</h3>
                            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}

                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        className="form-control my-2"
                                        placeholder="Enter Username"
                                        name="username"
                                        type="text"
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control my-2"
                                        placeholder="Enter password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>                                <div className="d-flex justify-content-center my-2">
                                    <button type="submit" className="btn btn-primary m-2">
                                        Submit
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
            {/* <div className='d-flex justify-content-center bg-secondary rounded p-4 my-5'>
                <img src={img} alt="" />
            </div> */}
        </div>
    );
};

export default Login;

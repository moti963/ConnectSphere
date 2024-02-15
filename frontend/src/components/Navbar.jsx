import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import logo from '../static/images/logo2.png';
import '../static/css/Navbar.css';
import profile from '../static/images/default_user.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../slices/authSlice";
import configFile from "../dataset/dataStore";

const Navbar = () => {
  const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_image = useSelector((state) => state.auth.user.image);
  // const navigate = useNavigate();

  // console.log(authUser);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <>
      {/* <nav
          className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
        > */}
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark sticky-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            ConnectSphere
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li>
                <NavLink className="nav-link" to="/newpost">
                  Write
                </NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="profile-pic">
                      <img src={(user_image) ? `${configFile.backendBaseUrl || configFile.localBaseUrl}` + user_image : profile} alt="User" />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
                    <NavLink className="dropdown-item" to={"/user"}>Account</NavLink>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item" onClick={handleLogout}> Log Out</button>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/signup">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
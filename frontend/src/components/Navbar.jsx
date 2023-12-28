import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from '../static/images/logo2.png';
import '../static/css/Navbar.css';
import profile from '../static/images/logo192.png';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
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
            <img src={logo} style={{ height: '36px' }} alt="BlogApp" />
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0 d-flex me-auto">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ml-auto">
              <li>
                <NavLink className="nav-link" to="/blog/newpost">
                  Write
                </NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="profile-pic">
                      <img src={profile} alt="User" />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
                    <li><a className="dropdown-item" href="/user/profile"> Account</a></li>
                    <li><a className="dropdown-item" href="/"> Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}> Log Out</button></li>
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
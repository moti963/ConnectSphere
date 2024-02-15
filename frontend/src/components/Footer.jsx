// Footer.jsx
import React from 'react';
import facebook from '../static/images/facebook.svg';
import twitter from '../static/images/twitterx.svg';
import instagram from '../static/images/instagram.svg';
import linkedin from '../static/images/linkedin.svg';
import github from '../static/images/github.svg';
import logo from "../static/images/cs_logo.png";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-2 shadow">
      <div className="container p-4">
        <div className="row my-4">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">

            <div className="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style={{ width: "150px", height: "150px" }}>
              <img src={logo} height="250" alt="ConnectSphere"
                loading="lazy" />
            </div>
            <p className="text-center">ConnectSphere - Your platform for blogging and portfolio showcasing.</p>
            <ul className="list-unstyled d-flex flex-row justify-content-center">
              <li><a href="https://facebook.com" className="text-light m-2"><img src={facebook} alt='Facebook' /></a></li>
              <li><a href="https://instagram.com" className="text-light m-2"><img src={instagram} alt='Instagram' /></a></li>
              <li><a href="https://twitter.com" className="text-light m-2"><img src={twitter} alt='Twitter' /></a></li>
              <li><a href="https://linkedin.com" className="text-light m-2"><img src={linkedin} alt='Linkedin' /></a></li>
              <li><a href="https://github.com" className="text-light m-2"><img src={github} alt='Github' /></a></li>
            </ul>

          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white"><i className="fas fa-paw pe-3"></i>Home</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white"><i className="fas fa-paw pe-3"></i>About</a>
              </li>
              <li className="mb-2">
                <a href="/newpost" className="text-white"><i className="fas fa-paw pe-3"></i>Write post</a>
              </li>
              <li className="mb-2">
                <a href="/user/signup" className="text-white"><i className="fas fa-paw pe-3"></i>Signup</a>
              </li>
              <li className="mb-2">
                <a href="/user/login" className="text-white"><i className="fas fa-paw pe-3"></i>Login</a>
              </li>
              <li className="mb-2">
                <a href="/user" className="text-white"><i className="fas fa-paw pe-3"></i>User Profile</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>Volunteer activities</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">ConnectSphere</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>General information</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>About the developer</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>Statistic data</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>Job</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>Tenders</a>
              </li>
              <li className="mb-2">
                <a href="#!" className="text-white"><i className="fas fa-paw pe-3"></i>Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact</h5>
            <ul className="list-unstyled">
              <li>
                <p><i className="fas fa-map-marker-alt pe-2"></i>63, Bhagalpur, Bihar, India</p>
              </li>
              <li>
                <p><i className="fas fa-phone pe-2"></i>+91 98 765 432 10</p>
              </li>
              <li>
                <p><i className="fas fa-envelope pe-2 mb-0"></i>connectsphere.contact@example.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        <p>&copy; {currentYear} <strong> @ConnectSphere</strong> All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

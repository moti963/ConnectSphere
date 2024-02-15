import React from 'react';
import logo from '../static/images/default_user.png';
import AlertMessage from '../components/AlertMessage';
import { useState } from 'react';
import { Link } from "react-router-dom";

const About = () => {
  const [alertMessage, setAlertMessage] = useState(null);

  const handleCloseAlert = () => {
    setAlertMessage(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(FormData);
    console.log(e);
  }

  return (

    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}
          <div className="px-3">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">About Us</h2>
              <p>
                Welcome to our application! We are a diverse and talented team
                working together to create a seamless and enjoyable experience
                for our users.
              </p>
              <p>
                Our Vision: To empower users through innovative technology,
                fostering a connected and engaged community.
              </p>
              <h4 className="mt-4">Key Features:</h4>
              <ul>
                <li>
                  <strong>User Authentication:</strong> Securely manage your
                  account with our authentication system.
                </li>
                <li>
                  <strong>Dynamic Routing:</strong> Explore different sections
                  of our application with ease.
                </li>
                <li>
                  <strong>Blog Section:</strong> Read and create engaging blog
                  posts using our built-in editors.
                </li>
                {/* Add more features as needed */}
              </ul>
              <p>
                Thank you for choosing our platform. We value your feedback and
                are committed to continuous improvement.
              </p>
              <p>
                If you have any questions, suggestions, or issues, please
                contact our support team at <Link to="mailto:connectsphere.support@example.com">connectsphere.support@example.com</Link>.
              </p>
              <h4 className="mt-4">Meet Our Team:</h4>
              <div className="row">
                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      src={logo}
                      alt="Team Member"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">John Doe</h5>
                      <p className="card-text">Frontend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      src={logo}
                      alt="Team Member"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Jane Smith</h5>
                      <p className="card-text">Backend Developer</p>
                    </div>
                  </div>
                </div>
                {/* Add more team members as needed */}
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-4 shadow">
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="text-light">Name</label>
              <input type="text" className="form-control" id="name" name='name' />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-light">Email</label>
              <input type="email" className="form-control" id="email" name='email' />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="text-light">Message</label>
              <textarea className="form-control" id="message" rows="3" name='message'></textarea>
            </div>
            <button type="submit" className="btn btn-primary my-2">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;

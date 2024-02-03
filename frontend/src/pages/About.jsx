import React from 'react';
import facebook from '../static/images/facebook.svg';
import twitter from '../static/images/twitterx.svg';
import instagram from '../static/images/instagram.svg';
import linkedin from '../static/images/linkedin.svg';
import github from '../static/images/github.svg';
import logo from '../static/images/logo192.png';


const About = () => {
  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
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
              <p>
                Thank you for choosing our platform. We value your feedback and
                are committed to continuous improvement.
              </p>
              <p>
                If you have any questions, suggestions, or issues, please
                contact our support team at support@example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-5 shadow rounded py-3">
        <div className="row">
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>
              Welcome to the BlogApp. Let's create something awesome for the curious people.
              Our platform is designed to empower writers and readers alike, providing a space for creativity,
              knowledge sharing, and engaging discussions. Whether you're here to discover new perspectives,
              share your thoughts, or connect with like-minded individuals, BlogApp is the place for you.
              Join our community and let's build something extraordinary together!            </p>
          </div>
          <div className="col-md-4">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="/">Services</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className='my-3'>Connect with Us</h4>
            <div className="d-flex flex-wrap justify-content-between">
              <a href="https://facebook.com" className="text-light m-2"><img src={facebook} alt='Facebook' /></a>
              <a href="https://instagram.com" className="text-light m-2"><img src={instagram} alt='Instagram' /></a>
              <a href="https://twitter.com" className="text-light m-2"><img src={twitter} alt='Twitter' /></a>
              <a href="https://linkedin.com" className="text-light m-2"><img src={linkedin} alt='Linkedin' /></a>
              <a href="https://github.com" className="text-light m-2"><img src={github} alt='Github' /></a>

            </div>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Us</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name" className="text-light">Name</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-light">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="text-light">Message</label>
                <textarea className="form-control" id="message" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-primary my-2">Send Message</button>
            </form>
          </div>
          <div className="col-md-3 offset-md-3">
            <h4>Site Map</h4>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="/">Services</a></li>
              <li><a href="/">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

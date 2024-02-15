import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container my-5">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">Oops! Page not found</p>
      <p className="fs-5">The page you are looking for might be in another castle.</p>
      <Link to="/">
        <button className="btn btn-lg btn-primary mt-4">Go Home</button>
      </Link>
      <div className="mt-5">
        <h3 className="mb-3">Explore some popular pages:</h3>
        <ul className="list-unstyled">
          <li>
            <Link to="/newpost" className="btn btn-link">Quill Editor</Link>
          </li>
          {/* Add more popular pages as needed */}
        </ul>
      </div>
      <div className="mt-5">
        <h3 className="mb-3">Still can't find what you're looking for?</h3>
        <p className="fs-5">Contact support for assistance.</p>
        <p className="fs-5">Our team is here to help you!</p>
        <p className="fs-5">Reach out via:</p>
        <p className="fs-5">Email: <a href="mailto:support@example.com">support@example.com</a></p>
        <p className="fs-5">Phone: <a href="tel:123-456-7890">123-456-7890</a></p>
      </div>
    </div>
  );
};

export default NotFound;

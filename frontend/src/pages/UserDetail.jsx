import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserAPI from '../user/UserAPI';
import NotFound from "../components/NotFound";
import "../static/css/UserDetails.css";
import userProfile from "../static/images/default_user.png";

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();

  const fetchUserDetails = async (username) => {
    try {
      const response = await UserAPI.getUserDetails(username);
      setUserDetails(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDetails(username);
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userDetails) {
    return (<NotFound />);
  }

  return (
    <div className="user-detail-container">
      <div className="basic-info">
        <h1 className='my-3 text-center'>User profile</h1>
        <div className="user-card">
          <h2>{userDetails.first_name} {userDetails.last_name}</h2>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
      </div>
      <div className="profile-section">
        <h2>Profile</h2>
        {userDetails.profile ? (
          <div className="user-card">
            <img src={userDetails.profile.profile_img ? "http://127.0.0.1:8000" + userDetails.profile.profile_img : `${userProfile}`} alt="Profile" />
            <p><strong>Bio:</strong> {userDetails.profile.bio}</p>
            <p><strong>Location:</strong> {userDetails.profile.location}</p>
            <p><strong>Birth Date:</strong> {userDetails.profile.birth_date}</p>
            <p><strong>Gender:</strong> {userDetails.profile.gender}</p>
            <p><strong>Website:</strong> <a href={userDetails.profile.website}>{userDetails.profile.website}</a></p>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      {/* <div className="contact-section">
        {userDetails.contacts && (
          <div className="user-card">
            <h2>Contact</h2>
            <ol>
              {userDetails.contacts.map((contact, index) => (
                <li key={index}>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Phone Number:</strong> {contact.phone_number}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div> */}
      <div className="education-section">
        <h2>Education</h2>
        {(userDetails.educations && userDetails.educations.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.educations.map((education, index) => (
                <li key={index}>
                  <p><strong>School/College:</strong> {education.school_clg}</p>
                  <p><strong>Degree:</strong> {education.degree}</p>
                  <p><strong>Field of Study:</strong> {education.field_of_study}</p>
                  <p><strong>Graduation Year:</strong> {education.graduation_year}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="experience-section">
        <h2>Experience</h2>
        {(userDetails.experiences && userDetails.experiences.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.experiences.map((experience, index) => (
                <li key={index}>
                  <p><strong>Company:</strong> {experience.company_name}</p>
                  <p><strong>Position:</strong> {experience.position}</p>
                  <p><strong>Start Date:</strong> {experience.start_date}</p>
                  <p><strong>End Date:</strong> {experience.end_date}</p>
                  <p><strong>Description:</strong> {experience.description}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="projects-section">
        <h2>Projects</h2>
        {(userDetails.projects && userDetails.projects.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.projects.map((project, index) => (
                <li key={index}>
                  <p><strong>Project Name:</strong> {project.project_name}</p>
                  <p><strong>Description:</strong> {project.description}</p>
                  <p><strong>Start Date:</strong> {project.start_date}</p>
                  <p><strong>End Date:</strong> {project.end_date ? project.end_date : 'Ongoing'}</p>
                  <p><strong>Project Link:</strong> <a href={project.project_link} target="_blank" rel="noopener noreferrer">{project.project_link}</a></p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="certifications-section">
        <h2>Certifications</h2>
        {(userDetails.certifications && userDetails.certifications.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.certifications.map((certification, index) => (
                <li key={index}>
                  <p><strong>Certification Name:</strong> {certification.certification_name}</p>
                  <p><strong>Issuing Organization:</strong> {certification.issuing_organization}</p>
                  <p><strong>Issue Date:</strong> {certification.issue_date}</p>
                  <p><strong>Expiration Date:</strong> {certification.expiration_date || 'No Expiration Date'}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="skills-section">
        <h2>Skills</h2>
        {(userDetails.skills && userDetails.skills.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.skills.map((skill, index) => (
                <li key={index}>
                  <p><strong>Skill Name:</strong> {skill.skill_name}</p>
                  <p><strong>Proficiency Level:</strong> {skill.proficiency_level}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="interests-section">
        <h2>Interests</h2>
        {(userDetails.interests && userDetails.interests.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.interests.map((interest, index) => (
                <li key={index}>
                  <p>{interest.interest_name}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="languages-section">
        <h2>Languages</h2>
        {(userDetails.languages && userDetails.languages.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.languages.map((language, index) => (
                <li key={index}>
                  <p><strong>Language Name:</strong> {language.language_name}</p>
                  <p><strong>Proficiency Level:</strong> {language.proficiency_level}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No information found</h3>)}
      </div>
      <div className="blogs-section">
        <h2>Blogs</h2>
        {(userDetails.blogs && userDetails.blogs.length > 0) ? (
          <div className="user-card">
            <ol>
              {userDetails.blogs.map((blog, index) => (
                <li key={index}>
                  <p><strong>Title:</strong> {blog.title}</p>
                  <Link to={`/post/${blog.id}`}>Read more</Link>
                </li>
              ))}
            </ol>
          </div>
        ) : (<h3 className='text-center text-muted'>No nlog found</h3>)}
      </div>
    </div>
  );
};

export default UserDetail;

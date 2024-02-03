import React, { useState, useEffect } from 'react';
import logo from '../static/images/logo192.png';
import UserProfileDisplay from './UserProfileDisplay';
import UserEducationDisplay from './UserEducationDisplay';
import UserContactDisplay from './UserContactDisplay';
import UserWorkExperienceDisplay from './UserWorkExperienceDisplay';
import UserSkillDisplay from './UserSkillDisplay';
import UserProjectDisplay from './UserProjectDisplay';
import UserCertificationDisplay from './UserCertificationDisplay';
import UserInterestDisplay from './UserInterestDisplay';
import UserLanguageDisplay from './UserLanguageDisplay';
import UserChangePassword from '../forms/UserChangePassword';
import UserSocialMediaDisplay from './UserSocialMediaDisplay';
import UserPostBlog from './UserPostBlog';
import UserAccount from './UserAccount';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../static/css/UserHome.css';

const navItems = [
    { id: 'account', label: 'Account', logo: logo },
    { id: 'myblog', label: 'MyBlog', logo: logo },
    { id: 'draft', label: 'Draft', logo: logo },
    { id: 'profile', label: 'Profile', logo: logo },
    { id: 'contact', label: 'Contact', logo: logo },
    { id: 'education', label: 'Education', logo: logo },
    { id: 'skills', label: 'Skills', logo: logo },
    { id: 'languages', label: 'Languages', logo: logo },
    { id: 'projects', label: 'Projects', logo: logo },
    { id: 'certification', label: 'Certification', logo: logo },
    { id: 'experience', label: 'Experience', logo: logo },
    { id: 'interest', label: 'Interest', logo: logo },
    { id: 'social-media', label: 'Social-Media', logo: logo },
    { id: 'change-password', label: 'Change-Password', logo: logo },
    // Add more navigation items as needed
];

const UserHome = () => {
    const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].id);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/user/login");
        }
    }, [isAuthenticated, navigate]);


    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };



    const renderProfileContent = () => {
        switch (selectedNavItem) {
            case 'account': return <UserAccount />;
            case 'myblog': return <UserPostBlog />;
            case 'draft': return <UserPostBlog />;
            case 'profile': return <UserProfileDisplay />;
            case 'contact': return <UserContactDisplay />;
            case 'education': return <UserEducationDisplay />;
            case 'skills': return <UserSkillDisplay />;
            case 'languages': return <UserLanguageDisplay />;
            case 'projects': return <UserProjectDisplay />;
            case 'certification': return <UserCertificationDisplay />;
            case 'experience': return <UserWorkExperienceDisplay />;
            case 'interest': return <UserInterestDisplay />;
            case 'social-media': return <UserSocialMediaDisplay />;
            case 'change-password': return <UserChangePassword />;
            default:
                return null;
        }
    };

    return (

        <>
            <header className="navbar navbar-expand-lg bg-body-tertiary bg-dark p-3" data-bs-theme="dark">
                <div className="nav-underline d-flex scrollmenu">
                    {navItems &&
                        navItems.map((item) => (
                            <span
                                key={item.id}
                                className={`mx-2 btn nav-item nav-link link-primary ${selectedNavItem === item.id ? 'active' : ''}`}
                                onClick={() => handleNavItemClick(item.id)}
                            >
                                {item.label}
                            </span>
                        ))}
                </div>
            </header>

            <div className="container-fluid my-2 d-flex flex-wrap">
                <div className="col-md-12 p-4">
                    <div className="profile-content">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHome;
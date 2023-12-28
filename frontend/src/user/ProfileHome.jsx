import React, { useState } from 'react';
import logo from '../static/images/logo192.png';
import UserContact from './UserContact';
import UserDetails from './UserDetails';

const navItems = [
    { id: 'info', label: 'Info' },
    { id: 'contact', label: 'Contact' },
    { id: 'details', label: 'Details' },
    { id: 'more', label: 'More' },
    // Add more navigation items as needed
];

const Profile = () => {
    const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].id);

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const renderProfileContent = () => {
        switch (selectedNavItem) {
            case 'details':
                return <UserDetails />;
            case 'contact':
                return <UserContact />;
            default:
                return null;
        }
    };

    return (
        <div className="container-fluid mt-5 d-flex flex-wrap">
            <div className="col-md-2 p-3 col-md-2 profile-sidebar">
                <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                    <svg className="bi pe-none me-2" width="40" height="32"></svg>
                    <img src={logo} alt="Profile" width="40" height="32" />
                    <span className="fs-4">Moti Kumar</span>
                </span>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto col-md-2">
                    {navItems.map((item) => (
                        <li className="nav-item" key={item.id}>
                            <span
                                className={`nav-link d-flex ${selectedNavItem === item.id ? 'active' : ''}`}
                                onClick={() => handleNavItemClick(item.id)}
                            >
                                <img src={logo} alt='Nav Element' className="bi pe- none me-2" width="16" height="16" />
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-10 p-4">
                <div className="profile-content">
                    <h1>User Profile</h1>
                    {renderProfileContent()}
                </div>
            </div>
        </div>
    );
};

export default Profile;

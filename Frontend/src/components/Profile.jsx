import React from 'react';
import {FaBell, FaCaretDown} from "react-icons/fa";
// Importing the CSS file for styling

const Profile = () => {
    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile</h1>
            <div className="notification-icon">
                <img src="/bell.svg" alt="bell" />
            </div>
            <div className="dropdown-icon">
<img src="/dropdown.svg" alt="dropdown" />
            </div>

            <div className="profile-info">
                <div className="profile-avatar">
                    {/* Placeholder for avatar */}
                    <div className="avatar-placeholder">
                        <img className="profile-img" src="/profile.png" alt=""/>
                    </div>
                </div>
                <h2 className="profile-name">John Doe</h2>
                <div className="profile-details">
                    <div className="detail-item">
                        <span className="detail-label">YEAR:</span>
                        <span className="detail-value">3</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Admission No:</span>
                        <span className="detail-value">EB1/61319/22</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">PROGRAM STUDY:</span>
                        <span className="detail-value">Computer Science</span>
                    </div>
                </div>
            </div>
            <button className="update-button">Update Profile</button>
        </div>
    );
};

export default Profile;

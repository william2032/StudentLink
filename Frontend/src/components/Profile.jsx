import React, { useState } from 'react';
import { FaBell, FaCaretDown } from "react-icons/fa";
// Importing the CSS file for styling

const Profile = () => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="profile-container flex-1 ml-auto justify-end">
            <div className="flex flex-row  justify-between">
                <h1 className="profile-title">Profile</h1>

                <div className=" flex  flex-row justify-end p-4 space-x-4">
                    <div className="notification-icon">
                        <img src="/bell.svg" alt="bell" />
                    </div>
                    <div className="dropdown-icon" onClick={toggleDetails}>
                        { showDetails ? <img src= " /uparrow.svg"  alt="dropdown" /> : <img src="/downarrow.svg"  alt="updown" /> }
                    </div>
                </div>

            </div>


            <div className="profile-info">
                <div className="profile-avatar">
                    {/* Placeholder for avatar */}
                    <div className="avatar-placeholder">
                        <img className="profile-img" src="/profile.png" alt="" />
                    </div>
                </div>
                <h2 className="profile-name">John Doe</h2>
                {showDetails && (
                    <div className="profile-details mt-5 ">
                        <div className="detail-item space-y-4">
                            <span className="detail-label">YEAR</span>
                            <span className="detail-value">3</span>
                        </div>
                        <div className="detail-item space-y-4">
                            <span className="detail-label">Admission No</span>
                            <span className="detail-value">EB1/61319/22</span>
                        </div>
                        <div className="detail-item space-y-4">
                            <span className="detail-label">PROGRAM STUDY</span>
                            <span className="detail-value">Computer Science</span>
                        </div>
                    </div>
                )}
            </div>
            <button className="update-button font-semibold mt-3">Update Profile</button>
        </div>
    );
};

export default Profile;

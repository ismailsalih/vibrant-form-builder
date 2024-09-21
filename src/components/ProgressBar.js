// ProgressBar.js
import React from 'react';
import '../ProgressBar.css'; // Add your styles here

const ProgressBar = ({ steps, activeStep }) => {
    const progressPercentage = ((activeStep + 1) / steps.length) * 100;

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
        </div>
    );
};

export default ProgressBar;

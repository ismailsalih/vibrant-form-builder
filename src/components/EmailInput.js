// src/components/EmailInput.js
import React from 'react';

const EmailInput = ({ placeholder }) => {
  return (
    <div className="form-group">
      <label>Email Input:</label>
      <input type="email" placeholder={placeholder} className="input-email" />
    </div>
  );
};

export default EmailInput;

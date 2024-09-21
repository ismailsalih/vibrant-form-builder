// src/components/TextInput.js
import React from 'react';

const TextInput = ({ label, placeholder }) => {
  return (
    <div className="form-group">
      <input type="text" placeholder={placeholder} className="input-text p-2" />
    </div>
  );
};

export default TextInput;

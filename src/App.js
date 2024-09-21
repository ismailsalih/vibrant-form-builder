// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from './components/FormBuilder';
import SavedForm from './components/SavedForm';
import './App.css';
import ThankYouScreen from './components/ThankYouScreen';

function App() {
  return (
    <Router>
      <div className="app">
      <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/saved-form" element={<SavedForm />} />
          <Route path="/thankyou" element={<ThankYouScreen />} />
          <Route path="/buildform" element={<FormBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { motion } from 'framer-motion';
import '../ThankYouScreen.css';
import { useNavigate } from 'react-router-dom';

const ThankYouScreen = () => {

    const navigate = useNavigate();
    const submitAnother = () => {
        navigate('/buildform');
    }
  return (
    <motion.div
      className="thank-you-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1>Thank You for Using Our FormBuilder!</h1>
      <p>Your response has been recorded.</p>
      <motion.button
        onClick={submitAnother}
        className="submit-another-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Build Another Form
      </motion.button>
    </motion.div>
  );
};

export default ThankYouScreen;

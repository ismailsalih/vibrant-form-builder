import React from 'react';
import { motion } from 'framer-motion';
import '../ThankYouScreen.css';

const ThankYouScreen = ({ submitAnother }) => {
  return (
    <motion.div
      className="thank-you-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h1>Thank You for Your Submission!</h1>
      <p>Your response has been recorded.</p>
      <motion.button
        onClick={submitAnother}
        className="submit-another-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit Another Response
      </motion.button>
    </motion.div>
  );
};

export default ThankYouScreen;

import { useState } from 'react';

const ToggleButton = ({}) => {
  // State to track toggle on/off
  const [isToggled, setIsToggled] = useState(false);

  // Toggle function
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        {/* The Toggle */}
        <div className="relative">
          {/* Hidden checkbox input */}
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={isToggled}
            onChange={toggleSwitch}
          />
          {/* Slider background */}
          <div className={`block w-8 h-5 rounded-full ${isToggled ? 'bg-green-400' : 'bg-gray-300'}`}></div>
          {/* Toggle knob */}
          <div
            className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition ${
              isToggled ? 'transform translate-x-3' : ''
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleButton;

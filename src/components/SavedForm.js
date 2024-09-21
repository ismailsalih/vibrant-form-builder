import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../SavedForm.css';
import ProgressBar from './ProgressBar';
import TextInput from './TextInput';
import { useNavigate } from 'react-router-dom';

const SavedForm = () => {
    const { state } = useLocation(); 
    const { steps } = state || { steps: [] }; 
    const [isLast, setLast] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        setActiveStep((prev) => {
            const nextStep = Math.min(prev + 1, steps.length - 1);
            if (nextStep === steps.length - 1) {
                setLast(true);  
            } else {
                setLast(false); 
            }
            return nextStep;
        });
    };

    const prevStep = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
        setLast(false);
    };

    const navigate = useNavigate();

    const finish = () => {

        navigate('/thankyou');
    };

    const renderField = (field) => {
        const placeholderText = "Type here...";
        switch (field.type) {
            case 'email':
                return <TextInput placeholder={placeholderText} />;
            case 'multiple-choice':
                return (
                    <div>
                        <select>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                    </div>
                );
            case 'short-name':
                return <TextInput class="border-none" placeholder={placeholderText} />;
            case 'dropdown':
                return (
                    <div className='relative inline-block w-full'>
                        <select className='block appearance-none w-full bg-white border-b-2 border-gray-400 text-gray-700 mt-4 py-2 px-4 pr-8 leading-tight cursor-point focus:outline-none focus:bg-white focus:border-black'>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M7 10l5 5 5-5H7z" />
                            </svg>
                        </div>
                    </div>
                );
            case 'phone-number':
                return <TextInput placeholder={placeholderText} />;
            case 'section':
                return <div className="section"></div>;
            case 'contact-information':
                return <TextInput placeholder={placeholderText} />;
            case 'legal':
                return <div className="legal"></div>;
            case 'country':
                return (
                    <div>
                        <select>
                            <option value="usa">United States</option>
                            <option value="canada">Canada</option>
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="form-container">
            <ProgressBar steps={steps} activeStep={activeStep} />
            <div className='p-8 flex flex-col justify-between'>
                <h2>{steps[activeStep].name}</h2>
                <p>{steps[activeStep].desc}</p>

                <div>
                    {steps[activeStep].fields.map((field) => (
                        <div key={field.id}>
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                <div className=" flex justify-between mt-auto">
                    <button className='back-button' onClick={prevStep} disabled={activeStep === 0}>Back</button>
                    <button style={{ display: !isLast ? 'block' : 'none' }} onClick={nextStep} disabled={activeStep === steps.length - 1}>
                        <i className='fa fa-long-arrow-right fa-2x text-black'></i>
                    </button>
                    {isLast && (
                    <button className='back-button' onClick={finish}>Submit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedForm;

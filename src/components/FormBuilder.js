import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import TextInput from './TextInput';
import 'font-awesome/css/font-awesome.min.css';
import '../FormBuilder.css'
import ToggleButton from './ToggleButton'; // Adjust the path based on your folder structure
import { useNavigate } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';

const FormBuilder = () => {
    const [steps, setSteps] = useState([{ id: 1, name: 'Welcome', desc: 'This is a description of the form', fields: [] }]);
    const [titles, setTitles] = useState([]); // State to hold titles for each field
    const [description, setDescription] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [existingFieldTypes, setExistingFieldTypes] = useState([]);

    // Function to get description based on field type
    const getDescription = (type) => {
        const descriptions = {
            text: "Enter text",
            email: "This will be used to contact you for the next steps.",
            'multiple-choice': "Select one of the available options.",
            'short-name': "Provide your short name or nickname.",
            dropdown: "Choose one of the options from the dropdown.",
            'phone-number': "Enter your valid phone number.",
            section: "This section is for organizational purposes.",
            'contact-information': "Enter your full contact information.",
            legal: "Provide any legal information required.",
            country: "Select your country of residence."
        };
        return descriptions[type] || 'No description available';
    };

    const getFieldTitle = (type) => {
        const titles = {
            text: "Enter text",
            email: "Enter your email",
            'multiple-choice': "Select an option",
            'short-name': "Enter your name",
            dropdown: "Choose an option",
            'phone-number': "Enter your phone number",
            section: "Section Title",
            'contact-information': "Enter contact information",
            legal: "Legal Information",
            country: "Select your country"
        };
        return titles[type] || 'Field';
    };

    // Delete a step
    const deleteStep = (id) => {
        if (id === 1) return; // Don't delete Welcome step
        setSteps(steps.filter(step => step.id !== id));
        setActiveStep(Math.max(0, activeStep - 1)); // Adjust active step after deletion
    };

    // Open dialog to add field
    const openDialog = () => {
        const currentFields = steps.flatMap(step => step.fields.map(field => field.type));
        // Only open the dialog if there are available field types
        if (currentFields.length < 9) { // Adjust this number based on how many types you have
            setExistingFieldTypes(currentFields); // Update existing field types
            setDialogOpen(true); // Open the dialog
        } else {
            // Optionally, you could show a message to the user that all fields have been added
            alert("All field types have already been added.");
        }
    };

    const openEditor = (index) => {
        setActiveStep(index);
        setEditOpen(true);
    }

    // Add selected field type to current step
    const addFieldToStep = (type) => {
        const newField = { id: Date.now(), type };
        setSteps((prevSteps) => {
            const updatedSteps = [...prevSteps];

            // Create a new step and add it to the steps array
            const newStep = { id: updatedSteps.length + 1, type: type, name: getFieldTitle(type), desc: getDescription(type), fields: [newField] };
            updatedSteps.push(newStep);

            // Initialize the title for the new step
            setTitles((prevTitles) => [...prevTitles, getFieldTitle(type)]);
            setDescription((prevDescs) => [...prevDescs, getDescription(type)]);

            return updatedSteps;
        });
        setActiveStep(steps.length); // Set the new step as active
        setDialogOpen(false); // Close dialog after adding
    };

    const handleTitleChange = (newTitle) => {
        setTitles((prevTitles) => {
            const updatedTitles = [...prevTitles];
            updatedTitles[activeStep - 1] = newTitle; // Update the title for the active step
            return updatedTitles;
        });
    };

    const handleDescChange = (newDesc) => {
        setDescription((prevDescs) => {
            const updatedDescs = [...prevDescs];
            updatedDescs[activeStep - 1] = newDesc; // Update the title for the active step
            return updatedDescs;
        });
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
                            {/* Add more countries as needed */}
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    const navigate = useNavigate();

    const buildForm = () => {
        const formData = {
            steps: steps.map(step => ({
                id: step.id,
                type: step.type,
                name: step.name,
                desc: step.desc,
                fields: step.fields // Assuming each step has an array of fields
            }))
        };
        navigate('/SavedForm', { state: formData });
    };

    return (
        <div className="builder-container flex flex-col md:flex-row h-screen">
            {/* Left Panel: Steps */}
            <div className="relative sidebar w-full md:w-64 p-4 flex flex-col justify-between">
                {!editOpen && (
                    <div className='w-full h-full flex flex-col justify-between'>
                        <div>
                            <div className="flex items-center space-x-2">
                                <i className="fa fa-bars mr-1"></i>
                                <h2 className="text-lg font-semibold">Steps</h2>
                            </div>
                            <p className="text-sm text-gray-500">The steps users will take to complete the form</p>
                            <ul className="mt-3">
                                {steps.map((step, index) => (
                                    <li
                                        key={step.id}
                                        className={`mt-2 bg-gray-100 rounded-md flex items-center p-2 cursor-pointer hover:bg-gray-200 ${activeStep === index ? 'active' : ''}`}
                                        onClick={() => openEditor(index)} // Make the li clickable
                                    >
                                        <span className="flex-grow text-center">{step.name}</span> {/* Center text */}
                                        {step.id !== 1 && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent click event from bubbling up to the li
                                                    deleteStep(step.id);
                                                }}
                                                className="flex items-center justify-center w-8 h-8 text-gray-600 hover:bg-gray-200 rounded-full focus:outline-none">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={openDialog} className="mt-4 text-sm border border-gray rounded-md p-1 hover:bg-gray-200">+ Add Field</button>
                        </div>
                        <div className="mt-auto">
                            <button onClick={() => buildForm()} className="border bg-black text-white rounded-lg p-2 hover:bg-gray-900">
                                <i className="fa fa-cloud mr-2"></i>
                                <span class="text-sm">Save & Publish</span>
                            </button>
                        </div>
                    </div>
                )}
                <div style={{ display: editOpen ? 'block' : 'none' }} className='transition-opacity duration-500 ease-in-out opacity-100 transform translate-y-0'>
                    <div className="flex justify-between">
                        <div>
                            <i className="fa fa-cog mr-2"></i>
                            <span className='font-bold'>
                                Settings
                            </span>
                        </div>
                        <button onClick={() => setEditOpen(false)} className="border rounded-lg p-2 flex items-center justify-center w-8 h-8 hover:bg-gray-100">
                            <i className="fa fa-times text-black-600"></i>
                        </button>
                    </div>
                    <div className='mt-2'>
                        <span className='text-sm'>
                            Title
                        </span>
                        <input
                            type="text"
                            value={titles[activeStep - 1] || 'No title available'}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Enter title"
                            className="border border-gray-300 rounded-md p-1 pl-2 mt-2 focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className='mt-2'>
                        <span className='text-sm'>
                            Discription
                        </span>
                        <input
                            type="text"
                            value={description[activeStep - 1] || 'No description available'}
                            onChange={(e) => handleDescChange(e.target.value)}
                            placeholder="Enter discription"
                            className="border border-gray-300 rounded-md p-1 pl-2 mt-2 focus:outline-none focus:border-black"
                        />
                    </div>
                    <div className='mt-4 flex justify-between'>
                        <span className='text-sm'>Required</span>
                        <ToggleButton />
                    </div>
                    <div className='mt-4 flex justify-between space-x-2'>
                        <button onClick={() => setEditOpen(false)} className="w-full border bg-black text-white rounded-lg p-2 hover:bg-gray-900">
                            <span class="text-sm">Save</span>
                        </button>
                        <button onClick={() => setEditOpen(false)} className="w-full border bg-white text-black rounded-lg p-2 hover:bg-gray-200">
                            <span className="text-sm">Discard</span>
                        </button>
                    </div>
                </div>
            </div>


            {/* Right Panel: Form Preview */}
            <div className="form-preview flex flex-col p-12 justify-center">
                {/* Render title based on the type of the first field */}
                <h2 class="font-serif text-xl">
                    {titles[activeStep - 1] || 'No title available'}
                </h2>
                <h2 className='mt-4 text-sm'>
                    {description[activeStep - 1] || 'No description available'}
                </h2>
                <div className="mt-4 max-w-lg">
                    {steps[activeStep].fields.map((field) => (
                        <div key={field.id}>
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                {/* Back and Next buttons */}
                {/* <div className="navigation-buttons">
                    <Button disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
                </div> */}
            </div>

            {/* Dialog for Adding Fields */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ style: { position: 'absolute', top: 20, margin: 0 } }}>
                <DialogTitle>Add Field</DialogTitle>
                <DialogContent>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { type: 'multiple-choice', label: 'Multiple Choice', icon: 'fa-list' },
                            { type: 'short-name', label: 'Short Name', icon: 'fa-pencil' },
                            { type: 'email', label: 'Email', icon: 'fa-envelope' },
                            { type: 'dropdown', label: 'Dropdown', icon: 'fa-chevron-down' },
                            { type: 'phone-number', label: 'Phone Number', icon: 'fa-phone' },
                            { type: 'section', label: 'Section', icon: 'fa-book' },
                            { type: 'contact-information', label: 'Contact Information', icon: 'fa-address-card' },
                            { type: 'legal', label: 'Legal', icon: 'fa-gavel' },
                            { type: 'country', label: 'Country', icon: 'fa-globe' }
                        ].map(({ type, label, icon }) => {
                            const alreadyExists = existingFieldTypes.includes(type);
                            return !alreadyExists && (
                                <div key={type} className="flex items-center p-1 cursor-pointer hover:bg-gray-200" onClick={() => addFieldToStep(type)}>
                                    <i className={`fa ${icon} mr-2`}></i>
                                    <span className='text-sm'>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormBuilder;

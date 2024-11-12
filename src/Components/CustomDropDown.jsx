import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomDropdown = ({
  options = [],
  defaultValue = '',
  onChange = () => {},
  placeholder = 'Select an option',
  className = '',
  backgroundColor = 'bg-purple-500',
  textColor = 'text-white',
  width = 'w-64',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange(value);
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <div className={`relative ${width} ${className}`}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-2 ${backgroundColor} ${textColor} rounded-md
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50
          transition-colors duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500'}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && !disabled && (
        <div 
          className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-2 text-left text-gray-800 hover:bg-purple-500 
                focus:outline-none focus:bg-purple-500 transition-colors duration-150
                ${selectedValue === option.value ? 'bg-purple-500' : ''}`}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
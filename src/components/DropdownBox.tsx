import React, { useState } from 'react';

interface DropdownBoxProps {
  isOpen: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const [selectedOption, setSelectedOption] = useState<'Number' | 'Name'>('Number');

  const handleOptionChange = (option: 'Number' | 'Name') => {
    setSelectedOption(option);
  };

  // Array de opções com tipos explícitos
  const options: ('Number' | 'Name')[] = ['Number', 'Name'];

  return (
    <div className="dropdown-box">
      {/* Parte superior - Título */}
      <div className="dropdown-header">
        <span className="dropdown-title">Sort by:</span>
      </div>

      {/* Parte inferior - Opções de radio */}
      <div className="dropdown-options">
        {options.map((option: 'Number' | 'Name') => (
          <div
            key={option}
            className={`dropdown-option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionChange(option)}  
          >
            <div className="radio-button">
              {selectedOption === option && <div className="selected-indicator" />}
            </div>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownBox;

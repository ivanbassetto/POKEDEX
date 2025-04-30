import React from 'react';

interface DropdownBoxProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Adicionando o setIsOpen aqui
  selectedOption: 'Number' | 'Name';
  setSelectedOption: React.Dispatch<React.SetStateAction<'Number' | 'Name'>>;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ isOpen, selectedOption, setSelectedOption, setIsOpen }) => {
  if (!isOpen) return null;

  const options: ('Number' | 'Name')[] = ['Number', 'Name'];

  return (
    <div className="dropdown_box">
      <div className="dropdown_header">
        <span className="dropdown_title">Sort by:</span>
      </div>
      <div className="dropdown_options">
        {options.map((option) => (
          <div
            key={option}
            className={`dropdown_option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => {
              setSelectedOption(option);
              setIsOpen(false); // Fecha a DropdownBox ao selecionar
            }}
          >
            <div className="radio_button">
              {selectedOption === option && <div className="selected_indicator" />}
            </div>
            <span className="option_text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownBox;

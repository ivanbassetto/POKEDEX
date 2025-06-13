import styles from "./DropdownBox.module.css";

interface DropdownBoxProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
  selectedOption: 'Number' | 'Name';
  setSelectedOption: React.Dispatch<React.SetStateAction<'Number' | 'Name'>>;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ isOpen, selectedOption, setSelectedOption, setIsOpen }) => {
  if (!isOpen) return null;

  const options: ('Number' | 'Name')[] = ['Number', 'Name'];

  return (
    <div className={styles.dropdown_box}>
      <div className={styles.dropdown_header}>
        <span className={styles.dropdown_title}>Sort by:</span>
      </div>
      <div className={styles.dropdown_options}>
        {options.map((option) => (
          <div
            key={option}
            className={`${styles.radio_option} ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => {
              setSelectedOption(option);
              setIsOpen(false); // Close DropdownBox when selecting
            }}
          >
            <div className={styles.radio_button}>
              {selectedOption === option && <div className={styles.selected_indicator} />}
            </div>
            <span className={styles.option_text}>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownBox;

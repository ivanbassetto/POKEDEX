

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

export default Button;
